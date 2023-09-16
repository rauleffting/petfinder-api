import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets'

export function makeFetchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const fetchPetsUseCase = new FetchPetsUseCase(prismaPetsRepository)

  return fetchPetsUseCase
}
