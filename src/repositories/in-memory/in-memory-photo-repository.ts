import { Photo, Prisma } from '@prisma/client'
import { randomInt } from 'crypto'
import { PhotoRepository } from '../photo-repository'

export class InMemoryPhotoRepository implements PhotoRepository {
  public items: Photo[] = []

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