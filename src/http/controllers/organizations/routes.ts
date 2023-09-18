import { FastifyInstance } from 'fastify'
import { signUp } from './sign-up'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/signup', signUp)
}
