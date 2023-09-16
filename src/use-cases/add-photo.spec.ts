/* eslint-disable @typescript-eslint/no-explicit-any */
import { InMemoryPhotosRepository } from '@/repositories/in-memory/in-memory-photos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AddPhotoUseCase } from './add-photo'
import { PhotoWithoutPetIdError } from './errors/photo-without-pet-id-error'

let photoRepository: InMemoryPhotosRepository
let sut: AddPhotoUseCase

describe('Add Photo Use Case', () => {
  beforeEach(async () => {
    photoRepository = new InMemoryPhotosRepository()
    sut = new AddPhotoUseCase(photoRepository)
  })

  it('should add photo to a pet', async () => {
    const petId = 123456

    const { photo } = await sut.execute({
      url: 'https://example.com/image1.jpg',
      petId,
    })

    expect(photo.url).toBe('https://example.com/image1.jpg')
  })

  it('should provide a pet id to add photo', async () => {
    await expect(
      (sut.execute as any)('https://example.com/image1.jpg'),
    ).rejects.toBeInstanceOf(PhotoWithoutPetIdError)
  })
})
