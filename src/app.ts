import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env";
import { userRoutes } from "./http/controllers/User/routes";
import { taskRoutes } from "./http/controllers/Task/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SERCRET,
    sign: {
        expiresIn: '10m'
    },
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(taskRoutes)