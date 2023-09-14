import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from './fetch-pets'
import { Gender, Size, Type } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets By Organizations Id Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
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

  it('should be able to fetch paginated pet search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        description:
          'He loves to play and eat. He also enjoys affection and going for walks in parks.',
        animal_type: Type.DOG,
        gender: Gender.MALE,
        size: Size.BIG,
        age: '4',
        breed: 'German Shepherd',
        organization_id: 'organization-01',
      })
    }

    const organizationsId = ['organization-01']

    const { pets } = await sut.execute({
      organizationsId,
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Pet 21' }),
      expect.objectContaining({ name: 'Pet 22' }),
    ])
  })
})
