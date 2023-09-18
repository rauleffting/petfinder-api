import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('SingIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to sign in', async () => {
    await request(app.server).post('/signup').send({
      name: 'Org 01',
      email: 'org01@example.com',
      password: '123456',
      address: 'Example Street, 462',
      city: 'Miami',
      state: 'Florida',
      postalCode: '33101',
      phone: '58548400',
    })

    const response = await request(app.server).post('/signin').send({
      email: 'org01@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
