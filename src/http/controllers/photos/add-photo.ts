import { makeAddPhotoUseCase } from '@/use-cases/factories/make-add-photo-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import fs from 'fs'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { env } from '@/env'
import { randomUUID } from 'crypto'

export async function addPhoto(request: FastifyRequest, reply: FastifyReply) {
  const addPhotoParamsSchema = z.object({
    petId: z.coerce.number().int(),
  })

  const addPhotoFileSchema = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    destination: z.string(),
    filename: z.string(),
    path: z.string(),
    size: z.number(),
  })

  const { petId } = addPhotoParamsSchema.parse(request.params)

  const photo = addPhotoFileSchema.parse(request.file)
  const photoId = randomUUID()

  try {
    const addPhotoUseCase = makeAddPhotoUseCase()

    await addPhotoUseCase.execute({
      petId,
      photoId,
    })

    const client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    })

    const input = {
      Bucket: env.AWS_BUCKET,
      Key: photoId,
      Body: fs.createReadStream(photo.path),
    }

    const command = new PutObjectCommand(input)

    await client.send(command)

    fs.unlinkSync(photo.path)
  } catch (error) {
    return reply.status(409).send({ message: error })
  }

  return await reply.status(201).send()
}
