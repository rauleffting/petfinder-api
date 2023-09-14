import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsByOrganizationsIdUseCaseRequest {
  organizationsId: string[]
  page: number
}

interface FetchPetsByOrganizationsIdUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByOrganizationsIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organizationsId,
    page,
  }: FetchPetsByOrganizationsIdUseCaseRequest): Promise<FetchPetsByOrganizationsIdUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrganizationsId(
      organizationsId,
      page,
    )

    return { pets }
  }
}
