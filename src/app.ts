import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { userRoutes } from "./http/controllers/User/routes";
import { taskRoutes } from "./http/controllers/Task/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SERCRET,
})

app.register(userRoutes)
app.register(taskRoutes)