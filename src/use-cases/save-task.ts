import { Task } from "@prisma/client";
import { Status } from "../enum/status";
import { TaskRepository } from "../repositories/task-repository";

interface SaveTaskUseCaseRequest {
    id: string,
    title: string,
    description: string,
    status: Status,
    created_at?: Date,
    updated_at: Date,
    user_id: string
}

interface SaveTaskUseCaseReponse {
    task: Task
}

export class SaveTaskUseCase {
    constructor( private taskRepository: TaskRepository) {}

    async execute({
        id,
        title,
        description,
        status,
        created_at,
        updated_at,
        user_id
    }: SaveTaskUseCaseRequest): Promise<SaveTaskUseCaseReponse> {

        const task = await this.taskRepository.save({
            id,
            title,
            description,
            status,
            created_at: created_at ?? new Date(),
            updated_at: new Date(),
            user_id,
        })

        return {
            task
        }
    }
}