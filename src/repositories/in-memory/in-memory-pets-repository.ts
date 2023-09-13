import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomInt } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomInt(1, 999999999),
      name: data.name,
      description: data.description,
      animal_type: data.animal_type,
      gender: data.gender,
      size: data.size,
      age: data.age,
      breed: data.breed,
      created_at: new Date(),
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }
}
