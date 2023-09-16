import { Photo } from '@prisma/client'
import { PhotoRepository } from '@/repositories/photo-repository'
import { PhotoWithoutPetIdError } from './errors/photo-without-pet-id-error'

interface AddPhotoUseCaseRequest {
  url: string
  petId: number
}

interface AddPhotoUseCaseResponse {
  photo: Photo
}

export class AddPhotoUseCase {
  constructor(private photoRepository: PhotoRepository) {}

  async execute({
    url,
    petId,
  }: AddPhotoUseCaseRequest): Promise<AddPhotoUseCaseResponse> {
    if (!petId) {
      throw new PhotoWithoutPetIdError()
    }

    const photo = await this.photoRepository.addPhoto({
      url,
      pet_id: petId,
    })

    return { photo }
  }
}
