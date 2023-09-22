import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class GetOrganizationDetailsUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(id: string): Promise<Organization> {
    const organization = await this.organizationsRepository.findById(id)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    return organization
  }
}
