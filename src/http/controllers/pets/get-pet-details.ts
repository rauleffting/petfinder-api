import { makeGetOrganizationDetailsUseCase } from '@/use-cases/factories/make-get-organization-details-use-case'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { makeGetPhotosUseCase } from '@/use-cases/factories/make-get-photos-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsParamsSchema = z.object({
    petId: z.coerce.number().int(),
  })

  const { petId } = getPetDetailsParamsSchema.parse(request.params)

  try {
    const getPetDetailsUseCase = makeGetPetDetailsUseCase()

    const { pet } = await getPetDetailsUseCase.execute(petId)

    const getPhotosUseCase = makeGetPhotosUseCase()

    const photos = await getPhotosUseCase.execute(petId)

    const getOrganizationDetailsUseCase = makeGetOrganizationDetailsUseCase()

    const organizationDetails = await getOrganizationDetailsUseCase.execute(
      pet.organization_id,
    )

    const petWithPhotos = {
      ...pet,
      photos,
      organizationDetails,
    }

    return await reply.status(200).send({ petWithPhotos })
  } catch (error) {
    return reply.status(409).send({ message: error })
  }
}
