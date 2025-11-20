import { Task, Prisma } from "@prisma/client";
import { TaskRepository } from "../task-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTaskRepository implements TaskRepository {
    async findById(id: string): Promise<Task | null> {
        const task = await prisma.task.findUnique({
            where: {
                id,
            }
        })

        return task
    }

    async searchMany(query: string, page: number) {
        const task = await prisma.task.findMany({
            where: {
                title: { contains: query, mode: "insensitive" }
            },
            take:20,
            skip: (page - 1) * 20 
        })

        return task
    }

    async create(data: Prisma.TaskCreateInput) {
        const task = await prisma.task.create({
            data
        })

        return task
    }

    async save(data: Task) {
        const taskUpdate = await prisma.task.update({
            where: {
                id: data.id
            },
            data
        })

        return taskUpdate
    }

    async delete(id: string) {
        await prisma.task.delete({
            where: {
                id,
            }
        })
    }

}