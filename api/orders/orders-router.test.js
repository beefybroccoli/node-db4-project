const request = require("supertest");
const app = require("./orders-router");
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

const ordersTable =  [
    {
      id: 1,
      order_number: 1,
      product_id: 1,
      quantity: 5,
      status: 'pending',
      user_id: 1
    },
    {
      id: 2,
      order_number: 1,
      product_id: 2,
      quantity: 5,
      status: 'pending',
      user_id: 2
    },
    {
      id: 3,
      order_number: 2,
      product_id: 3,
      quantity: 5,
      status: 'pending',
      user_id: 3
    },
    {
      id: 4,
      order_number: 2,
      product_id: 4,
      quantity: 5,
      status: 'pending',
      user_id: 4
    },
    {
      id: 5,
      order_number: 3,
      product_id: 5,
      quantity: 5,
      status: 'pending',
      user_id: 5
    }
  ];

describe("Endpoint GET /" , () =>{
    test("GET /", async ()=>{
        const res = await request(app).get("/");
        expect(res.body).toMatchObject(ordersTable);
        // console.log("res.body = ", res.body);
    })
})

describe("Endpoint GET /:id" , () =>{
    test("GET /:id", async ()=>{
        const res = await request(app).get("/2");
        expect(res.body).toMatchObject([ordersTable[1]]);
        // console.log("res.body = ", res.body);
    })
})

describe("Endpoint POST /" , () =>{
    test("POST /", async ()=>{
        const res = await request(app).post("/").send({
            order_number:12345, product_id:5,quantity:5,user_id:2,
            status:"pending"
        });
        expect(res.body).toMatchObject( {
            result: 1,
            newOrder: {
              id: 6,
              order_number: 12345,
              product_id: 5,
              quantity: 5,
              status: 'pending',
              user_id: 2
            }
          });
        // console.log("res.body = ", res.body);
    })
})

describe("Endpoint PUT /:id" , () =>{
    test("PUT /:id", async ()=>{
        const res = await request(app).post("/").send({
            order_number:12345, product_id:5,quantity:5,user_id:2,
            status:"pending"
        });
        expect(res.body).toMatchObject( {
            result: 1,
            newOrder: {
              id: 6,
              order_number: 12345,
              product_id: 5,
              quantity: 5,
              status: 'pending',
              user_id: 2
            }
          });
        const res2 = await request(app).put("/6").send({
            order_number:12345, product_id:5,quantity:10,user_id:2,
            status:"shipped"
        });
        expect(res2.body).toMatchObject( {
            result: 1,
            modifiedOrder: {
              id: 6,
              order_number: 12345,
              product_id: 5,
              quantity: 10,
              status: 'shipped',
              user_id: 2
            }
          });
        // console.log("res2.body = ", res2.body);
    })  
})

describe("Endpoint DELETE /:id" , () =>{
    test("DELETE /:id", async ()=>{
        const res = await request(app).post("/").send({
            order_number:12345, product_id:5,quantity:5,user_id:2,
            status:"pending"
        });
        expect(res.body).toMatchObject( {
            result: 1,
            newOrder: {
              id: 6,
              order_number: 12345,
              product_id: 5,
              quantity: 5,
              status: 'pending',
              user_id: 2
            }
          });
        const res2 = await request(app).delete("/6");
        expect(res2.body).toMatchObject( {
            result: 1,
            deletedOrder: {
              id: 6,
              order_number: 12345,
              product_id: 5,
              quantity: 5,
              status: 'pending',
              user_id: 2
            }
          });
        // console.log("res2.body = ", res2.body);
    })  
    
})
