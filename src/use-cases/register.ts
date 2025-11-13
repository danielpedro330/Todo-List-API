import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/user-repository";
import { hash } from "bcryptjs";
import { UserWithTheSameEmailError } from "./error/user-with-the-same-Email"

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseReply {
    user: User
}

export class RegisterUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({
        name,
        email,
        password
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {

        const password_hash = await hash(password, 6)

        const userWithTheSameEmail = await this.userRepository.findByEmail(email)

        if (userWithTheSameEmail) {
            throw new UserWithTheSameEmailError
        }

        const user = await this.userRepository.create({
            name,
            email,
            password: password_hash
        })

        return {
            user
        }
    }
}