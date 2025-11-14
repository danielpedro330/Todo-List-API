import { InMemoryTaskRepository } from '../repositories/in-Memory/in-Memory-task';
import { beforeAll, describe, expect, it } from 'vitest';
import { SearchTaskUseCase } from './search-task';
import { Status } from '../enum/status';

let taskRepository: InMemoryTaskRepository;
let sut: SearchTaskUseCase;

describe('Search Task Use Case', () => {
    beforeAll(() => {
        taskRepository = new InMemoryTaskRepository();
        sut = new SearchTaskUseCase(taskRepository)
    })

    it('Should be able to search task', async () => {
        await taskRepository.create({
            title: "Estudar JavaScript",
            description: "Devo estudar os fundamentos de javascript",
            status: Status.done
        })

        await taskRepository.create({
            title: "Estudar TypeScript",
            description: "Devo estudar os fundamentos de javascript",
            status: Status.done
        })

        const {task} = await sut.execute({
            query: 'JavaScript',
            page: 1
        })

        expect(task).toHaveLength(1)
        expect(task).toEqual([expect.objectContaining({ title: 'Estudar JavaScript' })])

        taskRepository.items.splice(0)
    })

    it('Should be able to pagened search task', async () => {
        for(let i = 1; i <= 22; i++) {
           await taskRepository.create({
            title: `Estudar TypeScript ${i}`,
            description: "Devo estudar os fundamentos de javascript",
            status: Status.done
        })}
        
        const {task} = await sut.execute({
            query: 'TypeScript',
            page: 2
        })

        expect(task).toHaveLength(2)
        expect(task).toEqual([
            expect.objectContaining({ title: 'Estudar TypeScript 21' }),
            expect.objectContaining({ title: 'Estudar TypeScript 22' })
        ])

    })
})