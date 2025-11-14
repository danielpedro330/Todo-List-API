import { makeSearchTaskUseCase } from "@/use-cases/factories/make-search-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchTaskBodySchema = z.object({
        q: z.string(),
        page: z.number()
    })

    const { q, page } =  searchTaskBodySchema.parse(request.body)

    
    const searchTaskUseCase = makeSearchTaskUseCase()

    const {task} = await searchTaskUseCase.execute({
        query: q,
        page
    })
    return reply.status(200).send({
        task
    })
     
}