import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { Gender, Size, Type } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should get pet details', async () => {
    await petsRepository.create({
      id: 123456,
      name: 'Romeo',
      description:
        'He loves to play and eat. He also enjoys affection and going for walks in parks.',
      animal_type: Type.DOG,
      gender: Gender.MALE,
      size: Size.BIG,
      age: '4',
      breed: 'German Shepherd',
      organization_id: 'organization-01',
    })

    const { pet } = await sut.execute(123456)

    expect(pet.name).toEqual('Romeo')
  })
})
