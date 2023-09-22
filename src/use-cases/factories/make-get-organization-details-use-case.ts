import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { GetOrganizationDetailsUseCase } from '../get-organization-details'

export function makeGetOrganizationDetailsUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const getOrganizationDetailsUseCase = new GetOrganizationDetailsUseCase(
    prismaOrganizationsRepository,
  )

  return getOrganizationDetailsUseCase
}
