import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { hash } from 'bcryptjs'
import { Gender, Size, Type } from '@prisma/client'
import { PetWithoutOrganizationError } from './errors/pet-without-organization-error'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterPetUseCase(petsRepository)

    await organizationsRepository.create({
      id: 'organization-01',
      name: 'Org Example',
      email: 'orgexample@example.com',
      password_hash: await hash('123456', 6),
      address: 'Example Street, 462',
      city: 'Miami',
      state: 'Florida',
      postal_code: '33101',
      phone: '58548400',
    })
  })

  it('should register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Romeo',
      description:
        'He loves to play and eat. He also enjoys affection and going for walks in parks.',
      animalType: Type.DOG,
      gender: Gender.MALE,
      size: Size.BIG,
      age: '4',
      breed: 'German Shepherd',
      organizationId: 'organization-01',
    })

    expect(pet.id).toEqual(expect.any(Number))
  })

  it('should not register a pet without organization', async () => {
    await expect(
      sut.execute({
        name: 'Romeo',
        description:
          'He loves to play and eat. He also enjoys affection and going for walks in parks.',
        animalType: Type.DOG,
        gender: Gender.MALE,
        size: Size.BIG,
        age: '4',
        breed: 'German Shepherd',
        organizationId: '',
      }),
    ).rejects.toBeInstanceOf(PetWithoutOrganizationError)
  })
})
