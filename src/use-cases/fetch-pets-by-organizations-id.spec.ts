import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByOrganizationsIdUseCase } from './fetch-pets-by-organizations-id'
import { Gender, Size, Type } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByOrganizationsIdUseCase

describe('Fetch Pets By Organizations Id Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByOrganizationsIdUseCase(petsRepository)
  })

  it('should fetch pets by organizations id', async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Juliet',
      description: 'She loves to jump walls',
      animal_type: Type.CAT,
      gender: Gender.FEMALE,
      size: Size.SMALL,
      age: '2',
      breed: 'Persian',
      organization_id: 'organization-02',
    })

    const organizationsId = ['organization-02']

    const { pets } = await sut.execute({
      organizationsId,
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Juliet' })])
  })
})