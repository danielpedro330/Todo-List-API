import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authentication } from "./authenticate";
import { refresh } from "./refresh";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/session', authentication)

    app.patch('/token/refresh', refresh)
}