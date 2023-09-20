import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/organizations/:organizationId/register-pet',
    { onRequest: [verifyJWT] },
    registerPet,
  )
}
