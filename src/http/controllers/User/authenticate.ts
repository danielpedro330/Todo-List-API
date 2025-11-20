import { InvalidCredentialsError } from "../../../use-cases/error/invalid-credentials";
import { makeAuthUseCase } from "../../../use-cases/factories/make-auth-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authentication(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = registerBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthUseCase()

        const {user} = await authenticateUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            }
        })
        
        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({ token })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }
        throw err
    }

}