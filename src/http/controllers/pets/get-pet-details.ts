import { makeGetOrganizationDetailsUseCase } from '@/use-cases/factories/make-get-organization-details-use-case'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { makeGetPhotosUseCase } from '@/use-cases/factories/make-get-photos-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import AWS from 'aws-sdk'
import { env } from '@/env'

interface Photo {
  id: string
  url: string
}

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

    const photosIds = await getPhotosUseCase.execute(petId)

    const getOrganizationDetailsUseCase = makeGetOrganizationDetailsUseCase()

    const organizationDetails = await getOrganizationDetailsUseCase.execute(
      pet.organization_id,
    )

    const photos: Photo[] = []

    const petWithPhotos = {
      ...pet,
      photos,
      organizationDetails,
    }

    const s3 = new AWS.S3({
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    })

    for (const photoId of photosIds) {
      const fileKey = photoId.id
      const params = {
        Bucket: env.AWS_BUCKET,
        Key: fileKey,
      }

      const s3Object = await s3.getObject(params).promise()

      if (s3Object?.Body) {
        petWithPhotos.photos.push({
          id: fileKey,
          url: s3Object.Body.toString('base64'),
        })
      }
    }

    return await reply.status(200).send({ petWithPhotos })
  } catch (error) {
    return reply.status(409).send({ message: error })
  }
}
