import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findManyByCity(city: string) {
    const organizations = this.items.filter(
      (organization) => organization.city === city,
    )

    if (!organizations) {
      throw new ResourceNotFoundError()
    }

    return organizations
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      phone: data.phone,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
