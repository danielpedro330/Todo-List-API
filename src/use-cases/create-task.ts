import { Task } from "@prisma/client";
import { Status } from "../enum/status";
import { TaskRepository } from "../repositories/task-repository";

interface CreateTaskUseCaseRequest {
    title: string,
    description: string,
    status: Status,
    userId: string
}

interface CreateTaskUseCaseResponse {
    task: Task
}

export class CreateTaskUseCase {
    constructor( private taskRepository: TaskRepository) {}

    async execute({
        title,
        description,
        status,
        userId
    }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {

        const task = await this.taskRepository.create({
            title,
            description,
            status,
            user: {
                connect: { id: userId }
            }
        })

        return {
            task
        }
    }
}