import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { deleteTask } from "./delete";
import { saveTask } from "./save";

export function userRoutes(app: FastifyInstance) {
    app.post('/tasks', create)

    app.get('/search_task', {onRequest: [verifyJWT]}, search)
    app.delete('/tasks', {onRequest: [verifyJWT]}, deleteTask)
    app.put('/tasks/:taskId', {onRequest: [verifyJWT]}, saveTask)
}