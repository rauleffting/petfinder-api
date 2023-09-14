import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'

export class FetchOrganizationsByCityUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(city: string): Promise<Organization[] | null> {
    const organizations =
      await this.organizationsRepository.findManyByCity(city)

    return organizations
  }
}
