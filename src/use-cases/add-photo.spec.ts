/* eslint-disable @typescript-eslint/no-explicit-any */
import { InMemoryPhotoRepository } from '@/repositories/in-memory/in-memory-photo-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AddPhotoUseCase } from './add-photo'
import { PhotoWithoutPetIdError } from './errors/photo-without-pet-id-error'

let photoRepository: InMemoryPhotoRepository
let sut: AddPhotoUseCase

describe('Add Photo Use Case', () => {
  beforeEach(async () => {
    photoRepository = new InMemoryPhotoRepository()
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
})
