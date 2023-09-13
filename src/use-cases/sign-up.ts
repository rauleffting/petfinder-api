import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface SignUpUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  city: string
  state: string
  postalCode: string
  phone: string
}

interface SignUpUseCaseResponse {
  organization: Organization
}

export class SignUpUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    city,
    state,
    postalCode,
    phone,
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash: passwordHash,
      address,
      city,
      state,
      postal_code: postalCode,
      phone,
    })

    return { organization }
  }
}
