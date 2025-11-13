import { Task } from "@prisma/client";
import { Status } from "../enum/status";
import { TaskRepository } from "../repositories/task-repository";

interface CreateTaskUseCaseRequest {
    title: string,
    description: string,
    status: Status
}

interface CreateTaskUseCaseResponse {
    task: Task
}

export class CreateTaskUseCase {
    constructor( private taskRepository: TaskRepository) {}

    async execute({
        title,
        description,
        status
    }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {

        const task = await this.taskRepository.create({
            title,
            description,
            status
        })

        return {
            task
        }
    }
}