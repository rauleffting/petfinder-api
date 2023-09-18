import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeSignUpUseCase } from '@/use-cases/factories/make-sign-up-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const singUpBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    phone: z.string(),
  })

  const { name, email, password, address, city, state, postalCode, phone } =
    singUpBodySchema.parse(request.body)

  try {
    const signUpUseCase = makeSignUpUseCase()

    await signUpUseCase.execute({
      name,
      email,
      password,
      address,
      city,
      state,
      postalCode,
      phone,
    })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return await reply.status(201).send()
}
