import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetParamsSchema = z.object({
    organizationId: z.string().uuid(),
  })

  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    animalType: z.enum(['DOG', 'CAT']),
    gender: z.enum(['MALE', 'FEMALE']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    age: z.string(),
    breed: z.string(),
  })

  const { organizationId } = registerPetParamsSchema.parse(request.params)

  const { name, description, animalType, gender, size, age, breed } =
    registerPetBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      name,
      description,
      animalType,
      gender,
      size,
      age,
      breed,
      organizationId,
    })
  } catch (error) {
    return reply.status(409).send({ message: error })
  }

  return await reply.status(201).send()
}
