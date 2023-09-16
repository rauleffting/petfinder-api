import { Photo, Prisma } from '@prisma/client'

export interface PhotosRepository {
  addPhoto(data: Prisma.PhotoUncheckedCreateInput): Promise<Photo>
  getPhotos(petId: number): Promise<Photo[]>
}
