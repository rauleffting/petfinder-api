/* eslint-disable @typescript-eslint/no-explicit-any */
import { InMemoryPhotosRepository } from '@/repositories/in-memory/in-memory-photos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPhotosUseCase } from './get-photos'

let photoRepository: InMemoryPhotosRepository
let sut: GetPhotosUseCase

describe('Add Photo Use Case', () => {
  beforeEach(async () => {
    photoRepository = new InMemoryPhotosRepository()
    sut = new GetPhotosUseCase(photoRepository)
  })

  it('should get photos by pet id', async () => {
    const petId = 123456

    await photoRepository.addPhoto({
      url: 'https://example.com/image1.jpg',
      pet_id: petId,
    })

    await photoRepository.addPhoto({
      url: 'https://example.com/image2.jpg',
      pet_id: petId,
    })

    const photos = await sut.execute(petId)

    expect(photos).toHaveLength(2)
    expect(photos[1].url).toBe('https://example.com/image2.jpg')
  })
})
