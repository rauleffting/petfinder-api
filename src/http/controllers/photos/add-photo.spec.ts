import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Add Photo (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should add photo to a pet', async () => {
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

    const response = await request(app.server)
      .post(`/pets/${juliet.id}/photos`)
      .attach('photo', 'cat.jpeg')

    expect(response.statusCode).toEqual(201)
  })
})
