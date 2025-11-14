import { Status } from "@/enum/status";
import { makeSaveUseCase } from "@/use-cases/factories/make-save-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function saveTask(request: FastifyRequest, reply: FastifyReply) {
    const saveTaskBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        status: z.nativeEnum(Status),
    })

    const deleteTaskParamsSchema = z.object({
        taskId: z.string().uuid()
    })
    
    const { taskId } =  deleteTaskParamsSchema.parse(request)

    const { title, description, status } =  saveTaskBodySchema.parse(request.body)

    
    const saveUseCase = makeSaveUseCase()

    await saveUseCase.execute({
        id: taskId,
        title,
        description,
        status,
        updated_at: new Date()
    })
    return reply.status(200).send({ message: "Task updated successfully" })
     
}