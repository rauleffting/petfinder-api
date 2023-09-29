import { FastifyInstance } from 'fastify'
import { addPhoto } from './add-photo'
import multer from 'fastify-multer'
import uploadConfig from '@/config/upload'

const upload = multer(uploadConfig)

export async function photosRoutes(app: FastifyInstance) {
  app.post(
    '/pets/:petId/photos',
    { preHandler: upload.single('photo') },
    addPhoto,
  )
}
