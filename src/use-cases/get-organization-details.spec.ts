import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetOrganizationDetailsUseCase } from './get-organization-details'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationDetailsUseCase

describe('Get Organization By Id Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationDetailsUseCase(organizationsRepository)
  })

  it('should get an organization by id', async () => {
    const organization = await organizationsRepository.create({
      name: 'Org 01',
      email: 'org01@example.com',
      password_hash: await hash('123456', 6),
      address: 'Example Street, 462',
      city: 'Miami',
      state: 'Florida',
      postal_code: '33101',
      phone: '58548400',
    })

    const response = await sut.execute(organization.id)

    expect(response.name).toBe('Org 01')
  })
})
