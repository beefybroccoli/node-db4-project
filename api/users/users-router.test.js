const request = require("supertest");
const app = require("./users-router");
const db = require("../../database/db-config");

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

const usersTable =  [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' },
    { id: 4, username: 'user4', password: 'password4' },
    { id: 5, username: 'user5', password: 'password5' }
  ];

describe('GET /', function () {
    test('respond from /', async ()=> {
        const res = await request(app).get("/");
        expect (res.body).toMatchObject(usersTable);
        // console.log("res.body = ", res.body);
    });    
});

describe('GET /:id', function () {
    test('respond from /:id', async ()=> {
        const res = await request(app).get("/1");
        expect (res.body).toMatchObject([usersTable[0]]);
        // console.log("res.body = ", res.body);
    });
})

describe('POST /', function () {
    test('respond from POST /', async ()=>{
        const res = await request(app).post("/").send({username:"tomtom", password:"tomtom"});
        expect(res.body).toMatchObject({
            result: 1,
            createdUser: { id: 6, username: 'tomtom', password: 'tomtom' }
          });
        // console.log("res.body = ", res.body);
    })
    
})

describe('PUT /:id', function () {
    test('respond from PUT /', async ()=>{
        const res = await request(app).post("/").send({username:"tomtom", password:"tomtom"});
        expect(res.body).toMatchObject({
            result: 1,
            createdUser: { id: 6, username: 'tomtom', password: 'tomtom' }
          });
        const res2 = await request(app).put("/6").send({username:"tomtom2", password:"tomtom2"});
        expect(res2.body).toMatchObject({
            result: 1,
            modifiedUser: { id: 6, username: 'tomtom2', password: 'tomtom2' }
        });
        // console.log("res.body = ", res.body);
    })
})

describe('DELETE /:id', function () {
    test('respond from DELETE /:id', async ()=>{
        const res = await request(app).post("/").send({username:"tomtom", password:"tomtom"});
        expect(res.body).toMatchObject({
            result: 1,
            createdUser: { id: 6, username: 'tomtom', password: 'tomtom' }
          });
        const res2 = await request(app).delete("/6");
        expect(res2.body).toMatchObject({
            result: 1,
            deletedUser: { id: 6, username: 'tomtom', password: 'tomtom' }
        });
        // console.log("res2.body = ", res2.body);
    })
})

describe('GET /api/users/other/', function () {
    test('respond with invalid path from server', async ()=> {
        const res = await request(app).get("/other/other");
        // console.log("res.body = ", res.body);
        expect (res.body).toHaveProperty('message', `invalid path /api/users/other/other`);
    });
})