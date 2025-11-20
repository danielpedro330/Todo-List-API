import { app } from "@/app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Saerch Task (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to search task", async () => {
        const {token} = await createAndAuthenticateUser(app)

        await request(app.server).post('/tasks').set("Authorization", `Bearer ${token}`).send({
            title: "JavaScript",
            description: "È uma linguagem de programação",
            status: "progress"
        })

        await request(app.server).post('/tasks').set("Authorization", `Bearer ${token}`).send({
            title: "TypeScript",
            description: "È uma linguagem de programação",
            status: "progress"
        })

        const response = await request(app.server).get('/tasks/search').set("Authorization", `Bearer ${token}`).query({
            q: "JavaScript",
            page:1
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body.task).toHaveLength(1)
        expect(response.body.task).toEqual([expect.objectContaining({
            title: "JavaScript"
        })])
    })
})