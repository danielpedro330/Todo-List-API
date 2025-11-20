import { app } from "@/app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Register (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to register", async () => {
        const response = await request(app.server).post('/users').send({
            name: "Daniel Doe",
            email: "daniel23@gmail.com",
            password: "123456"
        })

        expect(response.statusCode).toEqual(201)
    })
})