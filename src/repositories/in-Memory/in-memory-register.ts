import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../user-repository";
import { id } from "zod/locales";
import { randomUUID } from "node:crypto";
import { email } from "zod";

export class InMemoryUserRepository implements UsersRepository {
    public items: User[] = []

    async findById(id: string) {
        const user = await this.items.find(item => item.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async findByEmail(email: string) {
        const user = await this.items.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            created_at: new Date()
        }

        this.items.push(user)

        return user
    }

}