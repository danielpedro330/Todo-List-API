import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { userRoutes } from "./http/controllers/User/routes";

export const app = fastify()

app.register(userRoutes)

app.register(fastifyJwt, {
    secret: env.JWT_SERCRET,
})