const request = require("supertest");
const server = require('../../app'); // Путь к вашему файлу сервера

describe("GET /slots", () =>{
    it("should respond with 200 and a successful message when list all slots", async () => {
        const response = await request(server).get("/bits/listSlots");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("List slots");
    });
});
