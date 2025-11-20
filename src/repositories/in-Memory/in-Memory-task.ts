import { Task, Prisma } from "@prisma/client";
import { TaskRepository } from "../task-repository";
import { randomUUID } from "node:crypto";

type TaskCreateData = Prisma.TaskCreateInput & {
  user_id?: string
}


export class InMemoryTaskRepository implements TaskRepository {
    public items: Task[] = []

    async findById(id: string) {
        const task = this.items.find(item => item.id === id)

        if (!task) {
            return null
        }

        return task
    }

    async searchMany(query: string, page: number) {
        return this.items.filter(item => item.title.includes(query)).slice((page - 1) * 20, page * 20) 
    }

    async create(data: TaskCreateData) {
        const task = {
            id: randomUUID(),
            title: data.title,
            description: data.description,
            status: data.status,
            user_id: data.user?.connect?.id ?? data.user_id ?? '',
            created_at: new Date(),
            updated_at: new Date()
        }

        this.items.push(task)

        return task
    }

    async save(task: Task) {
        const taskIndex = this.items.findIndex(item => item.id == task.id)

        if (taskIndex >= 0) {
            this.items[taskIndex] = task
        }

        return task
    }

    async delete(id: string) {
        const taskIndex = this.items.findIndex(item => item.id == id)

        if (taskIndex >= 0) {
            this.items.splice(taskIndex, 1)
        }
    }

}