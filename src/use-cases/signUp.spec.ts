import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { describe, expect, it } from 'vitest'
import { SignUpUseCase } from './signUp'

describe('Sign Up Use Case', () => {
  it('should register an organization', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const sut = new SignUpUseCase(organizationsRepository)

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
})
