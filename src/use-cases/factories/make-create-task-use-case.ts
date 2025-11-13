import { PrismaTaskRepository } from "@/repositories/prisma/prisma-task-repository";
import { SaveTaskUseCase } from "../save-task";
import { CreateTaskUseCase } from "../create-task";

export function makeSaveUseCase() {
    const taskRepository = new PrismaTaskRepository()
    const createTask = new CreateTaskUseCase(taskRepository)

    return createTask
}