import { TaskRepository } from "@/repositories/task-repository"
import { Task } from "@prisma/client"

interface SearchTaskUseCaseRequest {
    query: string
    page: number
}

interface SearchTaskUseCaseResponse {
    task: Task[]
}

export class SearchTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute({
            query,
            page
        }: SearchTaskUseCaseRequest): Promise<SearchTaskUseCaseResponse> {
        const task = await this.taskRepository.searchMany(query, page)

        return {
            task
        }
    }
}