import { makeGetOrganizationDetailsUseCase } from '@/use-cases/factories/make-get-organization-details-use-case'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { makeGetPhotosUseCase } from '@/use-cases/factories/make-get-photos-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { env } from '@/env'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

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

    const client = new S3Client({
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    })

    for (const photoId of photosIds) {
      const fileKey = photoId.id

      const command = new GetObjectCommand({
        Bucket: env.AWS_BUCKET,
        Key: fileKey,
      })

      try {
        const s3Object = await client.send(command)

        if (s3Object.Body) {
          const url = `data:image/jpeg;base64,${s3Object.Body.toString(
            'base64',
          )}`
          petWithPhotos.photos.push({
            id: fileKey,
            url,
          })
        }
      } catch (error) {
        console.error(`Failed to retrieve object ${fileKey} from S3:`, error)
      }
    }

    return await reply.status(200).send({ petWithPhotos })
  } catch (error) {
    return reply.status(409).send({ message: error })
  }
}
