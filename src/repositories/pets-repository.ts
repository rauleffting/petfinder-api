import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByOrganizationsId(
    organizationsId: string[] | null,
    page: number,
  ): Promise<Pet[]>
}
