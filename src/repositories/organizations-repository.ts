import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
  findManyByCity(city: string): Promise<Organization[]>
  findById(id: string): Promise<Organization | null>
}
