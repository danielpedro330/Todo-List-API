import { makeDeleteUseCase } from "@/use-cases/factories/make-delete-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
    const deleteTaskParamsSchema = z.object({
        taskId: z.string().uuid()
    })

    const { taskId } =  deleteTaskParamsSchema.parse(request)

    
    const deleteUseCase = makeDeleteUseCase()

    await deleteUseCase.execute({
        id: taskId
    })
    return reply.status(204).send()
     
}