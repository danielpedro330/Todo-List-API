import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-Memory/in-memory-register";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserWithTheSameEmailError } from "./error/user-with-the-same-Email";

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe("Register Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it("Should be able register the user", async () => {
        const {user} = await sut.execute({
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("Should hash user password upon registration.", async () => {
        const {user} = await sut.execute({
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: '123456'
        })

        const isPassWordCorrectlyHashed = await compare('123456', user.password)

        expect(isPassWordCorrectlyHashed).toEqual(true)
    })

    
    it("Should not be able to register with the same email twice.", async () => {
        await sut.execute({
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: '123456'
        })

        await expect(() => sut.execute({
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: '123456'
        })
        ).rejects.toBeInstanceOf(UserWithTheSameEmailError)
    })
})