import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SignUpUseCase } from './signUp'
import { compare } from 'bcryptjs'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: SignUpUseCase

describe('Sign Up Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new SignUpUseCase(organizationsRepository)
  })

  it('should register an organization', async () => {
    const { organization } = await sut.execute({
      name: 'Org Example',
      email: 'orgexample@example.com',
      password: '123456',
      address: 'Example Street, 462',
      city: 'Miami',
      state: 'Florida',
      postalCode: '33101',
      phone: '58548400',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organizations password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Org Example',
      email: 'orgexample@example.com',
      password: '123456',
      address: 'Example Street, 462',
      city: 'Miami',
      state: 'Florida',
      postalCode: '33101',
      phone: '58548400',
    })

    const isPasswordHashed = await compare('123456', organization.password_hash)

    expect(isPasswordHashed).toBe(true)
  })
})