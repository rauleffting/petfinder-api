import { Photo, Prisma } from '@prisma/client'
import { randomInt, randomUUID } from 'crypto'
import { PhotosRepository } from '../photos-repository'

export class InMemoryPhotosRepository implements PhotosRepository {
  public items: Photo[] = []

  async getPhotos(petId: number) {
    const photos = this.items.filter((photo) => photo.pet_id === petId)

    return photos
  }

  async addPhoto(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = {
      id: data.id ?? randomUUID(),
      pet_id: data.pet_id,
    }

    this.items.push(photo)

    return photo
  }
}
