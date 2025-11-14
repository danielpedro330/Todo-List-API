import { app } from "../../../app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Delete Task (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to delete task", async () => {
        await request(app.server).post('/taks').send({
            id: "1",
            title: "JavaScript",
            description: "È uma linguagem de programação",
            status: "progress"
        })

        const response = await request(app.server).post('/taks/:taskId').send({
            taskId: 1
        })

        expect(response.statusCode).toEqual(204)
    })
})