import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-Memory/in-Memory-task";
import { Status } from "../enum/status";
import { DeleteTaskUseCase } from "./delete-task";

let taskRepository: InMemoryTaskRepository
let sut: DeleteTaskUseCase

describe("Delete Task Use Case", () => {
    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository()
        sut = new DeleteTaskUseCase(taskRepository)
    })

    it("Should be able delete the task", async () => {
        taskRepository.items.push({
            id: "1",
            title: "JavaScript",
            description: "Estudar os fundamentos do js",
            status: Status.progress,
            created_at: new Date(),
            updated_at: new Date()
        })

        const task = await sut.execute({
            id: "1",
        })

        expect(taskRepository.items).toHaveLength(0)
    })

})