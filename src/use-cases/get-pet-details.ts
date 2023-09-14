import { PetsRepository } from '@/repositories/pets-repository'

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(petId: number) {
    const pet = await this.petsRepository.findById(petId)

    return { pet }
  }
}
