const request = require("supertest");
const app = require("./products-router");
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

const productsTable =  [
    {
      id: 1,
      name: 'color shirt',
      description: 'a very colorful shirt',
      price: 11.99
    },
    {
      id: 2,
      name: 'pencil case',
      description: 'a very strong case',
      price: 11.99
    },
    {
      id: 3,
      name: 'water bottle',
      description: 'a long lasting bottle',
      price: 11.99
    },
    {
      id: 4,
      name: 'container box',
      description: 'a wood box',
      price: 11.99
    },
    {
      id: 5,
      name: 'fish tank',
      description: 'this tank can hold 5 fishes',
      price: 11.99
    }
  ];

describe("Endpoint GET /", ()=>{
    test("respond from GET /", async()=>{
        const res = await request(app).get("/");
        expect(res.body).toMatchObject(productsTable);
        // console.log("res.body = ", res.body);
    })
})

describe("Endpoint GET /:id", ()=>{
    test("respond from GET /", async()=>{
        const res = await request(app).get("/1");
        expect(res.body).toMatchObject([productsTable[0]]);
        // console.log("res.body = ", res.body);
    })
})

describe("Endpoint POST /", ()=>{
    test("respond from POST /", async()=>{
        const res = await request(app).post("/").send({
            name:"new show", description:"new shiny shoes", price:10.99
        });
        expect(res.body).toMatchObject({
            result: 1,
            newProduct: {
              id: 6,
              name: 'new show',
              description: 'new shiny shoes',
              price: 10.99
            }
          });
        // console.log("res.body = ", res.body);
    })
})

describe("Endpoint PUT /:id", ()=>{
    test("respond from PUT /:id", async()=>{
        const res = await request(app).post("/").send({
            name:"new show", description:"new shiny shoes", price:10.99
        });
        expect(res.body).toMatchObject({
            result: 1,
            newProduct: {
              id: 6,
              name: 'new show',
              description: 'new shiny shoes',
              price: 10.99
            }
          });
        const res2 = await request(app).put("/6").send({
            name:"new show 2", description:"new shiny shoes 2", price:100.99
        });
        expect(res2.body).toMatchObject(  {
            result: 1,
            modifiedProduct: {
              id: 6,
              name: 'new show 2',
              description: 'new shiny shoes 2',
              price: 100.99
            }
          });
        // console.log("res2.body = ", res2.body);
    })  
})

describe("Endpoint DELETE /:id", ()=>{
    test("respond from DELETE /:id", async()=>{
        const res = await request(app).post("/").send({
            name:"new show", description:"new shiny shoes", price:10.99
        });
        expect(res.body).toMatchObject({
            result: 1,
            newProduct: {
              id: 6,
              name: 'new show',
              description: 'new shiny shoes',
              price: 10.99
            }
          });
        const res2 = await request(app).delete("/6");
        expect(res2.body).toMatchObject( {
            result: 1,
            deletedProduct: {
              id: 6,
              name: 'new show',
              description: 'new shiny shoes',
              price: 10.99
            }
          });
        // console.log("res2.body = ", res2.body);
    })  
})