import { Prisma, Task } from "@prisma/client";

export interface TaskRepository {
    findById(id: string): Promise<Task | null>
    searchMany(query: string): Promise<Task | null>
    create(data: Prisma.TaskCreateInput): Promise<Task>
    save(task: Task): Promise<Task>
    delete(id: string): Promise<void>
}