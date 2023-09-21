import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetchPets } from './fetch-pets'
import { getPetDetails } from './get-pet-details'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/organizations/:organizationId/register-pet',
    { onRequest: [verifyJWT] },
    registerPet,
  )
  app.get('/pets', fetchPets)
  app.get('/pets/:petId', getPetDetails)
}
