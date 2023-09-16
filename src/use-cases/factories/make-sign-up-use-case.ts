import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { SignUpUseCase } from '../sign-up'

export function makeSignUpUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const signUpUseCase = new SignUpUseCase(prismaOrganizationsRepository)

  return signUpUseCase
}
