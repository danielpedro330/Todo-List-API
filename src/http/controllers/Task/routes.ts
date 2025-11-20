import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { deleteTask } from "./delete";
import { saveTask } from "./save";

export function taskRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT)
    
    app.post('/tasks', create)

    app.get('/tasks/search', search)

    app.delete('/tasks/:taskId/delete', deleteTask)
    
    app.patch('/tasks/:taskId/save', saveTask)
}