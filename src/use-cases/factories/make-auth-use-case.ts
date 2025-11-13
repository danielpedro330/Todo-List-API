import { AuthenticateUseCase } from "../authenticate";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";

export function makeAuthUseCase() {
    const userRepository = new PrismaUserRepository()
    const auth = new AuthenticateUseCase(userRepository)

    return auth
}