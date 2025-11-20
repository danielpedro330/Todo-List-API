import { app } from "@/app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Task (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to create task", async () => {
        const {token} = await createAndAuthenticateUser(app)

        const response = await request(app.server).post('/tasks').set("Authorization", `Bearer ${token}` ).send({
            title: "JavaScript",
            description: "È uma linguagem de programação",
            status: "progress"
        })

        expect(response.statusCode).toEqual(201)
    })
})