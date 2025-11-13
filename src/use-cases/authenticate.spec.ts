import { beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "../repositories/user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUserRepository } from "../repositories/in-Memory/in-memory-register";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./error/invalid-credentials";

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new AuthenticateUseCase(userRepository)
    })

    it("Should be able authenticate", async () => {
        await userRepository.create({
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: await hash('123456', 6)
        })

        const {user} = await sut.execute({
            email: 'daniel@gmail.com',
            password: '123456'
        })
        
        expect(user.id).toEqual(expect.any(String))
    })

    it("Should not be able authenticate with email wrong", async () => {
        await userRepository.create({
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: await hash('123456', 6)
        })


        await expect(() => sut.execute({
            email: 'daniel2@gmail.com',
            password: '123456'})).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("Should not be able authenticate with password wrong", async () => {
        await userRepository.create({
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: await hash('123456', 6)
        })


        await expect(() => sut.execute({
            email: 'daniel@gmail.com',
            password: '123586'})).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})