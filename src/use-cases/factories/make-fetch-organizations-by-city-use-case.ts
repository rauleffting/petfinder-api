import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { FetchOrganizationsByCityUseCase } from '../fetch-organizations-by-city'

export function makeFetchOrganizationsByCityUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const fetchOrganizationsByCityUseCase = new FetchOrganizationsByCityUseCase(
    prismaOrganizationsRepository,
  )

  return fetchOrganizationsByCityUseCase
}
