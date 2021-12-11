const request = require("supertest");
const app = require("./profiles-router");
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

const profilesTable =  [
    {
      id: 1,
      first_name: 'tom',
      middle_name: '',
      last_name: 'tom',
      email: 'tomtom@mail.com',
      user_type: 'admin',
      user_id: 1
    },
    {
      id: 2,
      first_name: 'hank',
      middle_name: 'charlie',
      last_name: 'jimmy',
      email: 'hankjimy@mail.com',
      user_type: 'user',
      user_id: 2
    },
    {
      id: 3,
      first_name: 'mason',
      middle_name: '',
      last_name: 'john',
      email: 'masonjohn@mail.com',
      user_type: 'user',
      user_id: 3
    },
    {
      id: 4,
      first_name: 'noob',
      middle_name: '',
      last_name: 'player',
      email: 'noobplayer@mail.com',
      user_type: 'user',
      user_id: 4
    },
    {
      id: 5,
      first_name: 'kite',
      middle_name: '',
      last_name: 'air',
      email: 'kiteair@mail.com',
      user_type: 'user',
      user_id: 5
    }
  ];


describe ("GET /" , ()=>{
    test("GET /", async()=>{
        const res = await request(app).get("/");
        expect(res.body).toMatchObject(profilesTable);
        // console.log("res.body = ", res.body);
    })
})

describe ("GET /:id" , ()=>{
    test("GET /:id", async()=>{
        const res = await request(app).get("/1");
        expect(res.body).toMatchObject([profilesTable[0]]);
        // console.log("res.body = ", res.body);
    })
})

describe ("POST /" , ()=>{
    test("POST /", async()=>{
        const res = await request(app).post("/").send({
            first_name:"tom", last_name:"tom", middle_name:"tom",
            email:"tom@mail.com",user_type:"user",user_id:3
        });
        expect(res.body).toMatchObject({
            result: 1,
            newProfile: {
              id: 6,
              first_name: 'tom',
              middle_name: 'tom',
              last_name: 'tom',
              email: 'tom@mail.com',
              user_type: 'user',
              user_id: 3
            }
          });
        // console.log("res.body = ", res.body);
    })
})

describe ("PUT /:id" , ()=>{

    test("PUT /", async()=>{
        const res = await request(app).post("/").send({
            first_name:"tom", last_name:"tom", middle_name:"tom",
            email:"tom@mail.com",user_type:"user",user_id:3
        });
        expect(res.body).toMatchObject({
            result: 1,
            newProfile: {
              id: 6,
              first_name: 'tom',
              middle_name: 'tom',
              last_name: 'tom',
              email: 'tom@mail.com',
              user_type: 'user',
              user_id: 3
            }
          });
        const res2 = await request(app).put("/6").send({
            first_name:"tom", last_name:"tom", middle_name:"tom",
            email:"tom@mail.com",user_type:"user",user_id:3
        });
        expect(res2.body).toMatchObject({
            result: 1,
            modifiedProfile: {
              id: 6,
              first_name: 'tom',
              middle_name: 'tom',
              last_name: 'tom',
              email: 'tom@mail.com',
              user_type: 'user',
              user_id: 3
            }
          });
        // console.log("res2.body = ", res2.body);
    })
    
})

describe ("DELETE /:id" , ()=>{

    test("DELETE /", async()=>{
        const res = await request(app).post("/").send({
            first_name:"tom", last_name:"tom", middle_name:"tom",
            email:"tom@mail.com",user_type:"user",user_id:3
        });
        expect(res.body).toMatchObject({
            result: 1,
            newProfile: {
              id: 6,
              first_name: 'tom',
              middle_name: 'tom',
              last_name: 'tom',
              email: 'tom@mail.com',
              user_type: 'user',
              user_id: 3
            }
          });
        const res2 = await request(app).delete("/6");
        expect(res2.body).toMatchObject( {
            result: 1,
            deletedProfile: {
              id: 6,
              first_name: 'tom',
              middle_name: 'tom',
              last_name: 'tom',
              email: 'tom@mail.com',
              user_type: 'user',
              user_id: 3
            }
          });
        // console.log("res2.body = ", res2.body);
    })
})