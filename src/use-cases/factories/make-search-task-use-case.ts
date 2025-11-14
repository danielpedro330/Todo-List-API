import { PrismaTaskRepository } from "@/repositories/prisma/prisma-task-repository";
import { SaveTaskUseCase } from "../save-task";
import { SearchTaskUseCase } from "../search-task";

export function makeSearchTaskUseCase() {
    const taskRepository = new PrismaTaskRepository()
    const searchTask = new SearchTaskUseCase(taskRepository)

    return searchTask
}