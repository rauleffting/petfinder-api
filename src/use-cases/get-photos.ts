import { Photo } from '@prisma/client'
import { PhotosRepository } from '@/repositories/photos-repository'

export class GetPhotosUseCase {
  constructor(private photoRepository: PhotosRepository) {}

  async execute(petId: number): Promise<Photo[]> {
    const photos = await this.photoRepository.getPhotos(petId)

    return photos
  }
}
