import { Prisma } from '@prisma/client'
import { PhotosRepository } from '../photos-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPhotosRepository implements PhotosRepository {
  async addPhoto(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = await prisma.photo.create({
      data,
    })

    return photo
  }

  async getPhotos(petId: number) {
    const photos = await prisma.photo.findMany({
      where: {
        pet_id: petId,
      },
    })

    return photos
  }
}
