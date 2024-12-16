const request = require("supertest");
const server = require('../../app'); // Путь к вашему файлу сервера

describe("POST /slots", () =>{
    it("should respond with 200 and a success message when a slot is created", async () =>{
        const slotData = {
            user_id: 1,
            category:"House",
            minPrice: 2000,
            redemtionPrice: 10000,
            saleTime: 12,
            bidStep: 20,
            status: "О",
        };

        const response = await request(server)
            .post("/slots/createSlot")
            .send(slotData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Create successful");
    });

    it("should respond with 400 when there is a validation error", async () => {
        const slotData = {
            user_id: 1,
            category:"House",
            minPrice: 10,
            redemtionPrice: 10000,
            saleTime: 12,
            bidStep: 20,
            status: "О",
        };

        const response = await request(server)
            .post("/slots/createSlot")
            .send(slotData);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeDefined();
    });
});

describe("GET /slots", () =>{
    it("should respond with 200 and a successful message when list all slots", async () => {
        const response = await request(server).get("/bits/listSlots");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("List slots");
    });
});