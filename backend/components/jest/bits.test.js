const request = require("supertest");
const server = require('../../app'); // Путь к вашему файлу сервера
describe("GET /bits", () =>{
    it("should respond with 200 and a successful message when list all bits", async () => {
        const response = await request(server).get("/bits/listBits");

        expect(response.statusCode).toBe(200);
    });
});
