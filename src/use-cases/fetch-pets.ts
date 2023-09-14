import { PetsRepository } from '@/repositories/pets-repository'
import { Gender, Pet, Size, Type } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  organizationsId: string[]
  page: number
  animalType?: Type
  gender?: Gender
  size?: Size
  age?: string
  breed?: string
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organizationsId,
    page,
    animalType,
    gender,
    size,
    age,
    breed,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany(
      organizationsId,
      page,
      animalType,
      gender,
      size,
      age,
      breed,
    )

    return { pets }
  }
}
