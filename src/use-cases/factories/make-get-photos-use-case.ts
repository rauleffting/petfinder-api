import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository'
import { GetPhotosUseCase } from '../get-photos'

export function makeGetPhotosUseCase() {
  const prismaPhotosRepository = new PrismaPhotosRepository()
  const getPhotosUseCase = new GetPhotosUseCase(prismaPhotosRepository)

  return getPhotosUseCase
}
