import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get pet details', async () => {
    const org = await prisma.organization.create({
      data: {
        name: 'Org 01',
        email: 'org01@example.com',
        password_hash: await hash('123456', 6),
        address: 'Example Street, 462',
        city: 'Miami',
        state: 'Florida',
        postal_code: '33101',
        phone: '58548400',
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Romeo',
        description:
          'He loves to play and eat. He also enjoys affection and going for walks in parks.',
        animal_type: 'DOG',
        gender: 'MALE',
        size: 'BIG',
        age: '4',
        breed: 'German Shepherd',
        organization_id: org.id,
      },
    })

    const juliet = await prisma.pet.create({
      data: {
        name: 'Juliet',
        description: 'She loves to jump walls.',
        animal_type: 'CAT',
        gender: 'FEMALE',
        size: 'SMALL',
        age: '4',
        breed: 'Persian',
        organization_id: org.id,
      },
    })

    await request(app.server)
      .post(`/pets/${juliet.id}/photos`)
      .attach('photo', 'cat.jpeg')

    await request(app.server)
      .post(`/pets/${juliet.id}/photos`)
      .attach('photo', 'cat.jpeg')

    const response = await request(app.server).get(`/pets/${juliet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.petWithPhotos.name).toBe('Juliet')
    expect(response.body.petWithPhotos.photos).toHaveLength(2)
    expect(response.body.petWithPhotos.organizationDetails.phone).toBe(
      '58548400',
    )
  })
})
