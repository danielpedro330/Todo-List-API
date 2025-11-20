import { makeDeleteUseCase } from "@/use-cases/factories/make-delete-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
    const deleteTaskParamsSchema = z.object({
        taskId: z.string().uuid()
    })

    console.log("PARAMS", request.params)
     

    const { taskId } =  deleteTaskParamsSchema.parse(request.params)
    
    const deleteUseCase = makeDeleteUseCase()

    await deleteUseCase.execute({
        id: taskId
    })
    return reply.status(204).send()
}