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

describe('server test GET /', function () {
  test('respond with hello world from server', async () => {
    const res = await request(app).get("/");
    expect(res.body).toHaveProperty('message', "Hello World from server");
  });

  test('respond with invalid path from server', async () => {
    const res = await request(app).get("/unknown");
    expect(res.body).toHaveProperty('message', "path /unknown not found");
  });
});

describe('test "/api/users/" endpoint', function () {

  const usersTable = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' },
    { id: 4, username: 'user4', password: 'password4' },
    { id: 5, username: 'user5', password: 'password5' }
  ];

  describe('GET /', function () {
    test('respond from /', async () => {
      const res = await request(app).get("/api/users/");
      expect(res.body).toMatchObject(usersTable);
      // console.log("res.body = ", res.body);
    });
  });

  describe('GET /:id', function () {
    test('respond from /:id', async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.body).toMatchObject([usersTable[0]]);
      // console.log("res.body = ", res.body);
    });
  })

  describe('POST /', function () {
    test('respond from POST /', async () => {
      const res = await request(app).post("/api/users/").send({ username: "tomtom", password: "tomtom" });
      expect(res.body).toMatchObject({
        result: 1,
        createdUser: { id: 6, username: 'tomtom', password: 'tomtom' }
      });
      // console.log("res.body = ", res.body);
    })

  })

  describe('PUT /:id', function () {
    test('respond from PUT /', async () => {
      const res = await request(app).post("/api/users/").send({ username: "tomtom", password: "tomtom" });
      expect(res.body).toMatchObject({
        result: 1,
        createdUser: { id: 6, username: 'tomtom', password: 'tomtom' }
      });
      const res2 = await request(app).put("/api/users/6").send({ username: "tomtom2", password: "tomtom2" });
      expect(res2.body).toMatchObject({
        result: 1,
        modifiedUser: { id: 6, username: 'tomtom2', password: 'tomtom2' }
      });
      // console.log("res.body = ", res.body);
    })
  })

  describe('DELETE /:id', function () {
    test('respond from DELETE /:id', async () => {
      const res = await request(app).post("/api/users/").send({ username: "tomtom", password: "tomtom" });
      expect(res.body).toMatchObject({
        result: 1,
        createdUser: { id: 6, username: 'tomtom', password: 'tomtom' }
      });
      const res2 = await request(app).delete("/api/users/6");
      expect(res2.body).toMatchObject({
        result: 1,
        deletedUser: { id: 6, username: 'tomtom', password: 'tomtom' }
      });
      // console.log("res2.body = ", res2.body);
    })
  })
})

describe(' test "/api/profiles/" endpoint', () => {
  const profilesTable = [
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


  describe("GET /", () => {
    test("GET /", async () => {
      const res = await request(app).get("/api/profiles/");
      expect(res.body).toMatchObject(profilesTable);
      // console.log("res.body = ", res.body);
    })
  })

  describe("GET /:id", () => {
    test("GET /:id", async () => {
      const res = await request(app).get("/api/profiles/1");
      expect(res.body).toMatchObject([profilesTable[0]]);
      // console.log("res.body = ", res.body);
    })
  })

  describe("POST /", () => {
    test("POST /", async () => {
      const res = await request(app).post("/api/profiles/").send({
        first_name: "tom", last_name: "tom", middle_name: "tom",
        email: "tom@mail.com", user_type: "user", user_id: 3
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

  describe("PUT /:id", () => {

    test("PUT /", async () => {
      const res = await request(app).post("/api/profiles/").send({
        first_name: "tom", last_name: "tom", middle_name: "tom",
        email: "tom@mail.com", user_type: "user", user_id: 3
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
      const res2 = await request(app).put("/api/profiles/6").send({
        first_name: "tom", last_name: "tom", middle_name: "tom",
        email: "tom@mail.com", user_type: "user", user_id: 3
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

  describe("DELETE /:id", () => {

    test("DELETE /", async () => {
      const res = await request(app).post("/api/profiles/").send({
        first_name: "tom", last_name: "tom", middle_name: "tom",
        email: "tom@mail.com", user_type: "user", user_id: 3
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
      const res2 = await request(app).delete("/api/profiles/6");
      expect(res2.body).toMatchObject({
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
})

describe('test "/api/products/" endpoint', () => {

  const productsTable = [
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

  describe("Endpoint GET /", () => {
    test("respond from GET /", async () => {
      const res = await request(app).get("/api/products/");
      expect(res.body).toMatchObject(productsTable);
      // console.log("res.body = ", res.body);
    })
  })

  describe("Endpoint GET /:id", () => {
    test("respond from GET /", async () => {
      const res = await request(app).get("/api/products/1");
      expect(res.body).toMatchObject([productsTable[0]]);
      // console.log("res.body = ", res.body);
    })
  })

  describe("Endpoint POST /", () => {
    test("respond from POST /", async () => {
      const res = await request(app).post("/api/products/").send({
        name: "new show", description: "new shiny shoes", price: 10.99
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

  describe("Endpoint PUT /:id", () => {
    test("respond from PUT /:id", async () => {
      const res = await request(app).post("/api/products/").send({
        name: "new show", description: "new shiny shoes", price: 10.99
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
      const res2 = await request(app).put("/api/products/6").send({
        name: "new show 2", description: "new shiny shoes 2", price: 100.99
      });
      expect(res2.body).toMatchObject({
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

  describe("Endpoint DELETE /:id", () => {
    test("respond from DELETE /:id", async () => {
      const res = await request(app).post("/api/products/").send({
        name: "new show", description: "new shiny shoes", price: 10.99
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
      const res2 = await request(app).delete("/api/products/6");
      expect(res2.body).toMatchObject({
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
})

describe('test "/api/orders" endpoint', () => {


  const ordersTable = [
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

  describe("Endpoint GET /", () => {
    test("GET /", async () => {
      const res = await request(app).get("/api/orders/");
      expect(res.body).toMatchObject(ordersTable);
      // console.log("res.body = ", res.body);
    })
  })

  describe("Endpoint GET /:id", () => {
    test("GET /:id", async () => {
      const res = await request(app).get("/api/orders/2");
      expect(res.body).toMatchObject([ordersTable[1]]);
      // console.log("res.body = ", res.body);
    })
  })

  describe("Endpoint POST /", () => {
    test("POST /", async () => {
      const res = await request(app).post("/api/orders/").send({
        order_number: 12345, product_id: 5, quantity: 5, user_id: 2,
        status: "pending"
      });
      expect(res.body).toMatchObject({
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

  describe("Endpoint PUT /:id", () => {
    test("PUT /:id", async () => {
      const res = await request(app).post("/api/orders/").send({
        order_number: 12345, product_id: 5, quantity: 5, user_id: 2,
        status: "pending"
      });
      expect(res.body).toMatchObject({
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
      const res2 = await request(app).put("/api/orders/6").send({
        order_number: 12345, product_id: 5, quantity: 10, user_id: 2,
        status: "shipped"
      });
      expect(res2.body).toMatchObject({
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

  describe("Endpoint DELETE /:id", () => {
    test("DELETE /:id", async () => {
      const res = await request(app).post("/api/orders/").send({
        order_number: 12345, product_id: 5, quantity: 5, user_id: 2,
        status: "pending"
      });
      expect(res.body).toMatchObject({
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
      const res2 = await request(app).delete("/api/orders/6");
      expect(res2.body).toMatchObject({
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

})