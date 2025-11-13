import { app } from "../../../app";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Authenticate (e2e)", () => {
    beforeEach(async () => {
        await app.ready()
    })
    
    afterEach(async () => {
        await app.close()
    })

    it("Should be able to authenticate", async () => {

        await request(app.server).post('/users').send({
            name: "Daniel Doe",
            email: "danielq2@gmail.com",
            password: "123456"
        })

        const authTesponse = await request(app.server).post('/session').send({
            email: "danielq2@gmail.com",
            password: "123456"
        })

        expect(authTesponse.statusCode).toEqual(201)
    })
})