import { Photo } from '@prisma/client'
import { PhotoRepository } from '@/repositories/photo-repository'

export class GetPhotosUseCase {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(petId: number): Promise<Photo[]> {
    const photos = await this.photoRepository.getPhotos(petId)

    return photos
  }
}
