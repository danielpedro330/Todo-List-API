import { PrismaTaskRepository } from "@/repositories/prisma/prisma-task-repository";
import { DeleteTaskUseCase } from "../delete-task";

export function makeSaveUseCase() {
    const taskRepository = new PrismaTaskRepository()
    const deleteTask = new DeleteTaskUseCase(taskRepository)

    return deleteTask
}