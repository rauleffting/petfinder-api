import { FastifyInstance } from 'fastify'
import { addPhoto } from './add-photo'
import multer from 'fastify-multer'

const upload = multer({ dest: 'uploads/' })

export async function photosRoutes(app: FastifyInstance) {
  app.post(
    '/pets/:petId/photos',
    { preHandler: upload.single('photo') },
    addPhoto,
  )
}
