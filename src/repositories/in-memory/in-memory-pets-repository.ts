import { Gender, Pet, Prisma, Size, Type } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomInt } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findMany(
    organizationsId: string[],
    page: number,
    animalType?: Type,
    gender?: Gender,
    size?: Size,
    age?: string,
    breed?: string,
  ) {
    function filterFunction(pet: Pet) {
      if (animalType && pet.animal_type !== animalType) return false
      if (gender && pet.gender !== gender) return false
      if (size && pet.size !== size) return false
      if (age && pet.age !== age) return false
      if (breed && pet.breed !== breed) return false
      return true
    }

    const filteredPets = organizationsId
      .flatMap((organizationId) =>
        this.items.filter((pet) => pet.organization_id === organizationId),
      )
      .filter(filterFunction)

    const pets = filteredPets.slice((page - 1) * 20, page * 20)

    return pets
  }

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
