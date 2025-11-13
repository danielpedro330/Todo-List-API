import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/user-repository";
import { InvalidCredentialsError } from "./error/invalid-credentials";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor( private userRepository: UsersRepository) {}

    async execute({
        email,
        password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const passwordVerification = await compare(password, user.password)

        if (!passwordVerification) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}