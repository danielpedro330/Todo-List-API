import { app } from "../../../app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create Task (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to create task", async () => {
        const response = await request(app.server).post('/taks').send({
            title: "JavaScript",
            description: "È uma linguagem de programação",
            status: "progress"
        })

        expect(response.statusCode).toEqual(201)
    })
})