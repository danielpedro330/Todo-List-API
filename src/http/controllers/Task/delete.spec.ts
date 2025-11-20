import { app } from "@/app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Delete Task (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to delete task", async () => {
       const {token, userId} = await createAndAuthenticateUser(app)

        const tasks = await prisma.task.create({
            data: {
                title: "JavaScript",
                description: "È uma linguagem de programação",
                status: "progress",
                user: {
                    connect: { id: userId }
                }
            }
        })

        const response = await request(app.server).delete(`/tasks/${tasks.id}/delete`).set("Authorization", `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(204)

        const taskExists = await prisma.task.findUnique({
            where: { id: tasks.id },
        });

        expect(taskExists).toBeNull();
    })
})