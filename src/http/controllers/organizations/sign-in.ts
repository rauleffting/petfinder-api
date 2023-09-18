import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeSignInUseCase } from '@/use-cases/factories/make-sign-in-use-case'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = signInBodySchema.parse(request.body)

  try {
    const signInUseCase = makeSignInUseCase()

    const { organization } = await signInUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: organization.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: organization.id,
        expiresIn: '7d',
      },
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // HTTPS
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
