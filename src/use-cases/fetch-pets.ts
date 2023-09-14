import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  organizationsId: string[]
  page: number
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organizationsId,
    page,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrganizationsId(
      organizationsId,
      page,
    )

    return { pets }
  }
}
