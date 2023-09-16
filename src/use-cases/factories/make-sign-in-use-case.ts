import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { SignInUseCase } from '../sign-in'

export function makeSignInUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const signInUseCase = new SignInUseCase(prismaOrganizationsRepository)

  return signInUseCase
}
