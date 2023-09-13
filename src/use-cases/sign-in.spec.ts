import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SignInUseCase } from './sign-in'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: SignInUseCase

describe('Sign In Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new SignInUseCase(organizationsRepository)
  })

  it('should be able to sign in', async () => {
    await organizationsRepository.create({
      id: 'organization-01',
      name: 'Org Example',
      email: 'orgexample@example.com',
      password_hash: String(hash('123456', 6)),
      address: 'Example Street, 462',
      city: 'Miami',
      state: 'Florida',
      postal_code: '33101',
      phone: '58548400',
    })

    const { organization } = await sut.execute({
      email: 'orgexample@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to sign in with wrong e-mail', async () => {
    await expect(
      sut.execute({
        email: 'orgexample@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
