import { FastifyInstance } from 'fastify'
import { signUp } from './sign-up'
import { signIn } from './sign-in'
import { refresh } from './refresh'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/signup', signUp)
  app.post('/signin', signIn)
  app.patch('/token/refresh', refresh)
}
