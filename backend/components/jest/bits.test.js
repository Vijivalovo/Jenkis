const request = require("supertest");
const { app, server } = require("../../app"); // Импорт сервера
const db = require("../../components/database"); // Импорт базы данных

// Подключаемся к базе данных перед запуском тестов
beforeAll(async () => {
    await db.connect();
});

// После всех тестов закрываем сервер и базу данных
afterAll(async () => {
    console.log("Closing server and database connection...");
    server.close(); // Закрытие сервера
    await db.close(); // Закрытие базы данных
});

// Тесты
describe("GET /bits", () => {
    it("should respond with 200 and a successful message when list all bits", async () => {
        const response = await request(app).get("/bits/listBits");
        expect(response.statusCode).toBe(200);
    });
});
