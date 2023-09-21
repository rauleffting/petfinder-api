import { makeAddPhotoUseCase } from '@/use-cases/factories/make-add-photo-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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

  try {
    const addPhotoUseCase = makeAddPhotoUseCase()

    await addPhotoUseCase.execute({
      petId,
      url: photo.path,
    })
  } catch (error) {
    return reply.status(409).send({ message: error })
  }

  return await reply.status(201).send()
}
