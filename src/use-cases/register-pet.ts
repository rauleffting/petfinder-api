import { Gender, Pet, Size, Type } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetWithoutOrganizationError } from './errors/pet-without-organization-error'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  animalType: Type
  gender: Gender
  size: Size
  age: string
  breed: string
  organizationId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    animalType,
    gender,
    size,
    age,
    breed,
    organizationId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    if (!organizationId) {
      throw new PetWithoutOrganizationError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      animal_type: animalType,
      gender,
      size,
      age,
      breed,
      organization_id: organizationId,
    })

    return { pet }
  }
}
