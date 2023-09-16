import { Gender, Prisma, Size, Type } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findMany(
    organizationsId: string[],
    page: number,
    animalType?: Type,
    gender?: Gender,
    size?: Size,
    age?: string,
    breed?: string,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: organizationsId,
        },
        animal_type: animalType,
        gender,
        size,
        age,
        breed,
      },
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findById(id: number) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
