import { FastifyInstance } from "fastify";
import { register } from "./register";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
}