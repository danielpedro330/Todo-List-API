import { app } from "../../../app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Save Task (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to save task", async () => {
        await request(app.server).post('/taks').send({
            title: "JavaScript",
            description: "È uma linguagem de programação",
            status: "progress"
        })

        const response = await request(app.server).post('/taks').send({
            q: "JavaScript",
            page:2
        })

        expect(response.statusCode).toEqual(200)
    })
})