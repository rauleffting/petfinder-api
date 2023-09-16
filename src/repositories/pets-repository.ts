import { Gender, Pet, Prisma, Size, Type } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findMany(
    organizationsId: string[],
    page: number,
    animalType?: Type,
    gender?: Gender,
    size?: Size,
    age?: string,
    breed?: string,
  ): Promise<Pet[]>
  findById(id: number): Promise<Pet | null>
}
