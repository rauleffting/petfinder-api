import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

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
