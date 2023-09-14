import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchOrganizationsByCityUseCase } from './fetch-organizations-by-city'
import { hash } from 'bcryptjs'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: FetchOrganizationsByCityUseCase

describe('Fetch Organizations By City Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new FetchOrganizationsByCityUseCase(organizationsRepository)
  })

  it('should register an organization', async () => {
    await organizationsRepository.create({
      name: 'Org 01',
      email: 'org01@example.com',
      password_hash: await hash('123456', 6),
      address: 'Example Street, 462',
      city: 'Miami',
      state: 'Florida',
      postal_code: '33101',
      phone: '58548400',
    })

    await organizationsRepository.create({
      name: 'Org 02',
      email: 'org02@example.com',
      password_hash: await hash('123456', 6),
      address: 'Example Street, 462',
      city: 'Los Angeles',
      state: 'California',
      postal_code: '33101',
      phone: '58548400',
    })

    const organizations = await sut.execute('Los Angeles')

    expect(organizations).toHaveLength(1)
    expect(organizations).toEqual([expect.objectContaining({ name: 'Org 02' })])
  })
})
