const request = require("supertest");
const app = require("./server.js");
const db = require("../database/db-config");

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('GET /', function () {
    test('respond with hello world from server', async ()=> {
        const res = await request(app).get("/");
        expect (res.body).toHaveProperty('message', "Hello World from server");
    });
});
