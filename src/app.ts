import { env } from './env'
import { ZodError } from 'zod'
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { Redis } from 'ioredis'
import fastifyRateLimit from '@fastify/rate-limit'
import multer from 'fastify-multer'
import { photosRoutes } from './http/controllers/photos/routes'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import Sentry from '@immobiliarelabs/fastify-sentry'
import { ProfilingIntegration } from '@sentry/profiling-node'

export const app = fastify()

app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute',
  redis: new Redis({
    port: env.REDIS_PORT,
    host: env.REDIS_HOST,
    connectTimeout: 500,
    maxRetriesPerRequest: 1,
  }),
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

app.register(Sentry, {
  dsn: env.SENTRY_DNS,
  integrations: [new ProfilingIntegration()],
  tracesSampleRate: 0.5,
  profilesSampleRate: 0.5,
})

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    app.Sentry.captureException(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
