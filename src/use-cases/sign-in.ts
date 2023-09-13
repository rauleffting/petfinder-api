import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'

interface SignInUseCaseRequest {
  email: string
  password: string
}

interface SignInUseCaseResponse {
  organization: Organization
}

export class SignInUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    return { organization }
  }
}
