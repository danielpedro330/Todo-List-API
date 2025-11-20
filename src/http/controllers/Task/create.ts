import { Status } from "@/enum/status";
import { makeCreateTaskUseCase } from "@/use-cases/factories/make-create-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createTaskBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        status: z.nativeEnum(Status)
    })

    const { title, description, status } =  createTaskBodySchema.parse(request.body)

    
    const createTask = makeCreateTaskUseCase()

    await createTask.execute({
        title,
        description,
        status,
        userId: request.user.sub
    })
    return reply.status(201).send()
     
}