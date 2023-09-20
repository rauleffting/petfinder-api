import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class FetchOrganizationsByCityUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(city: string): Promise<Organization[]> {
    const organizations =
      await this.organizationsRepository.findManyByCity(city)

    if (!organizations) {
      throw new ResourceNotFoundError()
    }

    return organizations
  }
}
