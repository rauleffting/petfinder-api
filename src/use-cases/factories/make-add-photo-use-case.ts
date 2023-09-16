import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository'
import { AddPhotoUseCase } from '../add-photo'

export function makeAddPhotoUseCase() {
  const prismaPhotosRepository = new PrismaPhotosRepository()
  const addPhotoUseCase = new AddPhotoUseCase(prismaPhotosRepository)

  return addPhotoUseCase
}
