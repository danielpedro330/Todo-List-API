import { PrismaTaskRepository } from "@/repositories/prisma/prisma-task-repository";
import { SaveTaskUseCase } from "../save-task";

export function makeSaveUseCase() {
    const taskRepository = new PrismaTaskRepository()
    const saveTask = new SaveTaskUseCase(taskRepository)

    return saveTask
}