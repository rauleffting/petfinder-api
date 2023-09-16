import { Photo, Prisma } from '@prisma/client'

export interface PhotoRepository {
  addPhoto(data: Prisma.PhotoUncheckedCreateInput): Promise<Photo>
}
