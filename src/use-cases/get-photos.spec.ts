/* eslint-disable @typescript-eslint/no-explicit-any */
import { InMemoryPhotoRepository } from '@/repositories/in-memory/in-memory-photo-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPhotosUseCase } from './get-photos'

let photoRepository: InMemoryPhotoRepository
let sut: GetPhotosUseCase

describe('Add Photo Use Case', () => {
  beforeEach(async () => {
    photoRepository = new InMemoryPhotoRepository()
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
