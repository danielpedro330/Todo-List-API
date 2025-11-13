import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
    const UserRepository = new PrismaUserRepository()
    const register = new RegisterUseCase(UserRepository)

    return register
}