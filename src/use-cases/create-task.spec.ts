import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-Memory/in-Memory-task";
import { CreateTaskUseCase } from "./create-task";
import { Status } from "../enum/status";

let taskRepository: InMemoryTaskRepository
let sut: CreateTaskUseCase

describe("Create Task Use Case", () => {
    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository()
        sut = new CreateTaskUseCase(taskRepository)
    })

    it("Should be able register a task", async () => {
        const {task} = await sut.execute({
            title: "Estudar JavaScript",
            description: "Devo estudar os fundamentos de javascript",
            status: Status.done
        })

        expect(task.id).toEqual(expect.any(String))
    })

})