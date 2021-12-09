const request = require("supertest");
const app = require("./users-router");
const db = require("../../database/db-config");

const usersTable =  [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' },
    { id: 4, username: 'user4', password: 'password4' },
    { id: 5, username: 'user5', password: 'password5' }
  ];

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
    test('respond from /', async ()=> {
        const res = await request(app).get("/");
        expect (res.body).toMatchObject(usersTable);
        console.log("res.body = ", res.body);
    });

    // jest.setTimeout(10000);
    test('respond with invalid path from server', async ()=> {
        
        const res = await request(app).get("/other/other");
        // console.log("res.body = ", res.body);
        expect (res.body).toHaveProperty('message', `invalid path /api/users/other/other`);
    });
});
