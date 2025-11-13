import { Status } from "../enum/status";
import { TaskRepository } from "../repositories/task-repository";

interface DeleteTaskUseCaseRequest {
    id: string,
}

export class DeleteTaskUseCase {
    constructor( private taskRepository: TaskRepository) {}

    async execute({
        id
    }: DeleteTaskUseCaseRequest) {

        const task = await this.taskRepository.delete(id)

}}