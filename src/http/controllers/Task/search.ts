import { makeSearchTaskUseCase } from "@/use-cases/factories/make-search-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchTaskBodySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { q, page } =  searchTaskBodySchema.parse(request.query)
    
    const searchTaskUseCase = makeSearchTaskUseCase()

    const {task} = await searchTaskUseCase.execute({
        query: q,
        page
    })
    return reply.status(200).send({
        task
    })
     
}