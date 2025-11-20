import { app } from "@/app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Save Task (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to save task", async () => {
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
        

        const response = await request(app.server).patch(`/tasks/${tasks.id}/save`).set("Authorization", `Bearer ${token}` ).send({
            title: "TypeScript",
            description: "È uma linguagem de programação",
            status: "progress",
            user_id: userId
        })

        expect(response.statusCode).toEqual(200)
    })
})