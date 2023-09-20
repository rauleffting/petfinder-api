import { makeFetchOrganizationsByCityUseCase } from '@/use-cases/factories/make-fetch-organizations-by-city-use-case'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { makeGetPhotosUseCase } from '@/use-cases/factories/make-get-photos-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    animalType: z.enum(['DOG', 'CAT']).optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    age: z.string().optional(),
    breed: z.string().optional(),
  })

  const { city, page, animalType, gender, size, age, breed } =
    fetchPetsQuerySchema.parse(request.query)

  try {
    const fetchOrganizationsByCityUseCase =
      makeFetchOrganizationsByCityUseCase()

    const organizations = await fetchOrganizationsByCityUseCase.execute(city)

    const organizationsId = organizations.map((organization) => organization.id)

    const fetchPetsUseCase = makeFetchPetsUseCase()

    const { pets } = await fetchPetsUseCase.execute({
      organizationsId,
      page,
      animalType,
      gender,
      size,
      age,
      breed,
    })

    const getPhotosUseCase = makeGetPhotosUseCase()

    const petsWithPhotos = await Promise.all(
      pets.map(async (pet) => {
        const photos = await getPhotosUseCase.execute(pet.id)
        return {
          ...pet,
          photos,
        }
      }),
    )

    return await reply.status(200).send({ petsWithPhotos })
  } catch (error) {
    return reply.status(409).send({ message: error })
  }
}
