import { env } from './env'
import { ZodError } from 'zod'
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import multer from 'fastify-multer'
import { photosRoutes } from './http/controllers/photos/routes'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastifyRedis from '@fastify/redis'
import fastifyRateLimit from '@fastify/rate-limit'

export const app = fastify()

app.register(fastifyRedis, {
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
  port: env.REDIS_PORT,
  family: 4,
  maxRetriesPerRequest: 40,
})

app.register(fastifyRateLimit, {
  max: 10,
  timeWindow: '5 seconds',
  redis: app.redis,
})

app.register(fastifySwagger, {
  mode: 'static',
  specification: {
    path: 'src/swagger.json',
    baseDir: '',
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(multer.contentParser)

app.register(organizationsRoutes)
app.register(petsRoutes)
app.register(photosRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
