import { Photo, Prisma } from '@prisma/client'
import { randomInt } from 'crypto'
import { PhotosRepository } from '../photos-repository'

export class InMemoryPhotosRepository implements PhotosRepository {
  public items: Photo[] = []

  async getPhotos(petId: number) {
    const photos = this.items.filter((photo) => photo.pet_id === petId)

    return photos
  }

  async addPhoto(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = {
      id: data.id ?? randomInt(1, 999999999),
      url: data.url,
      pet_id: data.pet_id,
    }

    this.items.push(photo)

    return photo
  }
}
