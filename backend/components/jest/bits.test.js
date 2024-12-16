const request = require("supertest");
const server = require('../../app'); // Путь к вашему файлу сервера

describe("POST /bits", () =>{
    it("should respond with 200 and a success message when a bit is created", async () =>{
        const bitData = {
            auction_id: 1,
            user_id: 1,
            bit: 1000,
            timeBit: new Date(),
        };

        const response = await request(server)
            .post("/bits/createBit")
            .send(bitData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Create successful");
    });

    it("should respond with 400 when there is a validation error", async () => {
        const bitData = {
            auction_id: 1,
            user_id: 1,
            bit: 0,
            timeBit: new Date(),
        };

        const response = await request(server)
            .post("/bits/createBit")
            .send(bitData);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeDefined();
    });
});

describe("GET /bits", () =>{
    it("should respond with 200 and a successful message when list all bits", async () => {
        const response = await request(server).get("/bits/listBits");

        expect(response.statusCode).toBe(200);
    });
});