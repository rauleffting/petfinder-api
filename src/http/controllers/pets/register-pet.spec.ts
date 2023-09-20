import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should register a pet', async () => {
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

    const authResponse = await request(app.server).post('/signin').send({
      email: 'org01@example.com',
      password: '123456',
    })

    const response = await request(app.server)
      .post(`/organizations/${org.id}/register-pet`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Romeo',
        description:
          'He loves to play and eat. He also enjoys affection and going for walks in parks.',
        animalType: 'DOG',
        gender: 'MALE',
        size: 'BIG',
        age: '4',
        breed: 'German Shepherd',
      })

    expect(response.statusCode).toEqual(201)
  })
})
