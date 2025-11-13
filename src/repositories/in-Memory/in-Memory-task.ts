import { Task, Prisma } from "@prisma/client";
import { TaskRepository } from "../task-repository";
import { randomUUID } from "node:crypto";
import { title } from "node:process";

export class InMemoryTaskRepository implements TaskRepository {
    public items: Task[] = []

    async findById(id: string) {
        const task = this.items.find(item => item.id === id)

        if (!task) {
            return null
        }

        return task
    }

    async searchMany(query: string) {
        const task = this.items.find(item => item.title === query)

        if (!task) {
            return null
        }

        return task
    }

    async create(data: Prisma.TaskCreateInput) {
        const task = {
            id: randomUUID(),
            title: data.title,
            description: data.description,
            status: data.status,
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