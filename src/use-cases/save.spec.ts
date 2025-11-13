import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-Memory/in-Memory-task";
import { Status } from "../enum/status";
import { SaveTaskUseCase } from "./save-task";

let taskRepository: InMemoryTaskRepository
let sut: SaveTaskUseCase

describe("Save Task Use Case", () => {
    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository()
        sut = new SaveTaskUseCase(taskRepository)
    })

    it("Should be able seve the task", async () => {
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
            title: "JavaScript",
            description: "Estudar os fundamentos do js e exercitar",
            status: Status.progress,
            updated_at: new Date() 
        })

        expect(task.task.description).toEqual("Estudar os fundamentos do js e exercitar")
    })

})