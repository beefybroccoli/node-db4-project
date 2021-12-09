# Node DB4 Module Project

## Instructions

### Task 1: Project Setup and Submission

Your assignment page on Canvas should contain instructions for submitting this project. If you are still unsure, reach out to School Staff.

### Task 2: Minimum Viable Product

Design the **data model** for a _recipe book_ application and use Knex migrations and seeding functionality to build a **SQLite database** based on the model and seed it with test data. Then, build an **endpoint** to fetch a recipe by its id.

The requirements for the system as stated by the client are:

- Recipes have a name that must be unique (e.g. "Spaghetti Bolognese").
- Recipes contain an ordered list of steps (e.g. "Preheat the oven", "Roast the squash").
- Each step contains some instructions (e.g. "Preheat the oven") and belongs to a single recipe.
- Steps might involve any number of ingredients (zero, one or more).
- If a step involves one or more ingredients, each ingredient is used in a certain quantity.
- Ingredients can be used in different recipes, in different quantities.

#### Data Model

After brainstorming with the team it is suggested that a **JSON representation** of a recipe _could_ look like the following:

```json
{
  "recipe_id" : 1,
  "recipe_name": "Spaghetti Bolognese",
  "created_at": "2021-01-01 08:23:19.120",
  "steps": [
    {
      "step_id": 11,
      "step_number": 1,
      "step_instructions": "Put a large saucepan on a medium heat",
      "ingredients": []
    },
    {
      "step_id": 12,
      "step_number": 2,
      "step_instructions": "Add 1 tbsp olive oil",
      "ingredients": [
        { "ingredient_id": 27, "ingredient_name": "olive oil", "quantity": 0.014 }
      ]
    },
  ]
}
```

The JSON representation above is the result of querying data from several tables using SQL joins, and then using JavaScript to hammer the data into that particular shape.

Note that it's unlikely all the fields `{ "ingredient_id": 27, "ingredient_name": "olive oil", "quantity": 0.014 }` come from the same table. Otherwise an ingredient could only ever be used in a fixed quantity!

Before writing any code, write out all desired tables in the data model and determine the relationships between tables.

**Try to keep your design to FOUR tables**. With three tables it will be hard to meet all requirements, and more than 5 is likely overkill.

#### Project Scaffolding

- Put an Express application together starting with the `package.json` and a `knexfile.js`. Use existing projects as reference if needed.

#### Migrations and Seeds

- Write a migration file that creates all tables necessary to model this data
- Write seed files to populate the tables with test data. **Hint**: Keep your recipes simple or this step could become extremely time consuming.

#### Data Access

Write a data access file that exports an object with the following function:

- `getRecipeById(recipe_id)`
  - Should resolve a representation of the recipe similar to the one shown in the **Data Model** above.
  - The function will pull information from several tables using Knex and then create a response object using loops, objects, array methods etc.
  - There are many ways to solve this, but from a performance standpoint the fewer trips to the database the better!

#### Endpoint

Write an endpoint to fetch a recipe by its id, using the `getRecipeById(recipe_id)` function.

### Task 3: Stretch Goals

- [ ] Write an endpoint to create a new recipe using ingredients that already exist in the database.
- [ ] Build a form in React that allows to create a new recipe selecting ingredients that already exist in the database.
- [ ] Research **transactions** in SQL and Knex: POSTing a recipe involves inserts to several tables, and the operation needs to completely succeed or be rolled back if any of the inserts fail.

The representation **sent to the server** _could_ look like the following:

```json
{
  "recipe_name": "Spaghetti Bolognese",
  "steps": [
    {
      "step_number": 1,
      "step_instructions": "Put a large saucepan on a medium heat",
    },
    {
      "step_number": 2,
      "step_instructions": "Mix eggs and ham",
      "ingredients": [
        { "ingredient_id": 27, "quantity": 2 },
        { "ingredient_id": 48, "quantity": 0.1 }
      ]
    },
  ]
}
```
=======================================================================
#### Error Code Table
  Status Code | Description
  --- | --- 
  200 | request successfully processed 
  201 | successfully created the new record
  400 | the request could not be understood by the server
  401 | unauthorized request from an unknown user
  403 | unauthorized request from a known user
  404 | the request resource is not found on the server
  500 | unknown and/or unexpected error occured
  503 | the server is not ready to handle this request

=======================================================================
#### milestone 01 - working db and correct knex configuration
  * the migration and seeds are configured correctly
  * the db-config file is configured correctly to retrieve data from database

=======================================================================
#### milestone 02 - create five API end points for users (working on this branch)

  ##### Endpoint GET **/api/users/** (complete)

    The sample query, GET http://localhost:9000/api/users/

    Body : none;

    Response : 
      [ {"username":"user12", "password":"password1"}, ... ]

  ##### Endpoint GET **/api/users/:id** (complete)

    The sample query, GET http://localhost:9000/api/users/5

    Body : none;

    Response : 
      [{"username":"user12", "password":"password1"}]

  ##### Endpoint POST **/api/users/** (complete)

    The sample query, POST http://localhost:9000/api/users/

    Body : 
      {"username":"abc@yahoo.com", "password":"tricord!!22"}

    Response : 
      [{"username":"abc@yahoo.com", "password":"tricord!!22"}]

  ##### Endpoint PUT **/api/users/:id** (complete)

    The sample query, PUT http://localhost:9000/api/users/10

    Body : 
      {"username":"abc@yahoo.com", "password":"tricord!!22"}

    Response : 
      [{"username":"abc@yahoo.com", "password":"tricord!!22"}]

  ##### Endpoint DELETE **/api/users/:id** (complete)

    The sample query, DELETE http://localhost:9000/api/users/10

    Body : none;

    Response : 
      [{"result":"successfully deleted user id 10}]

  ##### Middleware verify_params_id (complete)

    The middleware verify {id} in req.params to have below properties:
    _type of integer
    _not null
    _not undefined
    _value is greater than zero

  ##### Middleware verify_existing_user_with_user_id  (complete)

    This middleware verify {user_id} to have below properties:
    _type of string
    _not null
    _not undefined
    _not empty string
    _length between 5 and 20
    

  ##### Middleware verify_new_user (complete)

    This middleware verify {username} to have below properties:
    _type of string
    _not null
    _not undeefined
    _not empty string
    _length between 5 and 20

    This middleware verify {password} to have below properties:
    _type of string
    _not null
    _not undeefined
    _not empty string
    _length between 5 and 20

  ##### Middleware verify_unique_user (incomplete)

    This middleware verify the {username} to be unique inside the ""users"" table.

  ##### Middleware verify_password_integrity (incomplete)

    This middleware verify the {password} to have below properties:
    _not null
    _not undefined
    _not empty string
    _alphanumeric
    _length between 5 and 20

===================================================================================
#### milestone 03 - create five API end points for profiles

  ##### Endpoint GET **/api/profiles/**

    The sample query, GET http://localhost:9000/api/profiles/

    Body : none;

    Response :  
      [ 
        {
          "email": "masonjohn@mail.com",
          "first_name": "mason",
          "id": 3,
          "last_name": "john",
          "middle_name": "",
          "user_id": 3,
          "user_type": "user"
        },
        {
          "email": "noobplayer@mail.com",
          "first_name": "noob",
          "id": 4,
          "last_name": "player",
          "middle_name": "",
          "user_id": 4,
          "user_type": "user"
        },
        ...
    ]


  ##### Endpoint GET **/api/profiles/:id**

    The sample query, GET http://localhost:9000/api/profiles/3

    Body : none;

    Response :  
      [ 
        {
          "email": "masonjohn@mail.com",
          "first_name": "mason",
          "id": 3,
          "last_name": "john",
          "middle_name": "",
          "user_id": 3,
          "user_type": "user"
        }
      ]

  ##### Endpoint POST **/api/profiles/**

    The sample query, POST http://localhost:9000/api/profiles/

    Body :
      {
        "email": "mason3@mail.com",
        "first_name": "mason3",
        "last_name": "mason3",
        "middle_name": "c",
        "user_id": 4,
        "user_type": "user"
      }

    Response :
      {
        "newProfile": {
            "email": "mason3@mail.com",
            "first_name": "mason3",
            "id": 11,
            "last_name": "mason3",
            "middle_name": "c",
            "user_id": 4,
            "user_type": "user"
        },
        "result": 1
      }


  ##### Endpoint PUT **/api/profiles/**

    The sample query, PUT http://localhost:9000/api/profiles/

    Body :
      {
        "email": "mason3@mail.com",
        "first_name": "mason3",
        "id": 10,
        "last_name": "mason3",
        "middle_name": "c",
        "user_id": 4,
        "user_type": "user"
      }

    Response:
      {
      "modifiedProfile": {
          "email": "mason3@mail.com",
          "first_name": "mason3",
          "id": 10,
          "last_name": "mason3",
          "middle_name": "c",
          "user_id": 4,
          "user_type": "user"
      },
      "result": 1
    }


  ##### Endpoint DELETE **/api/profiles/:id**

    The sample query, DELETE http://localhost:9000/api/profiles/11

    Body : none;

    Reponse :
      {
        "deletedProfile": {
            "email": "mason3@mail.com",
            "first_name": "mason3",
            "id": 11,
            "last_name": "mason3",
            "middle_name": "c",
            "user_id": 4,
            "user_type": "user"
        },
        "result": 1
    }




  ##### Middleware verify_profile_id

    verify the {id} exists in the **profiles** table.

  ##### Middleware verify_new_profile

    verify the {first_name, last_name, middle_name, email, user_type, user_id} is valid

  ##### Middleware verify_user_id

    verify the {user_id} exist in the the **users** table.

===================================================================================
#### milestone 04 - create five API end points for products
   

  ##### Endpoint GET **/api/products/**

    The sample query, GET http://localhost:9000/api/products/

    Body : none;

    Response :
      [
        {
            "description": "a very colorful shirt",
            "id": 1,
            "name": "color shirt",
            "price": 11.99
        },
        {
            "description": "a very strong case",
            "id": 2,
            "name": "pencil case",
            "price": 11.99
        },
        {
            "description": "a long lasting bottle",
            "id": 3,
            "name": "water bottle",
            "price": 11.99
        },
        {
            "description": "a wood box",
            "id": 4,
            "name": "container box",
            "price": 11.99
        },
        {
            "description": "new",
            "id": 6,
            "name": "new",
            "price": 10.99
        }
      ]


  ##### Endpoint GET **/api/products/:id**
  
    The sample query, GET http://localhost:9000/api/products/4

    Body : none;

    Response :
      [
          {
              "description": "a wood box",
              "id": 4,
              "name": "container box",
              "price": 11.99
          }
      ]


  ##### Endpoint POST **/api/products/**
  
    The sample query, POST http://localhost:9000/api/products/

    Body :
      {
        "description": "description",
        "name": "bookmark",
        "price": 2.1
      }

    Response :

      {
        "newProduct": {
            "description": "description",
            "id": 7,
            "name": "bookmark",
            "price": 2.1
        },
        "result": 1
      }


  ##### Endpoint PUT **/api/products/:id**
  
    The sample query, PUT http://localhost:9000/api/products/7

    Body : 
      {
        "description": "description",
        "id": 7,
        "name": "new bookmark",
        "price": 2.1
      }

    Response :
      {
        "modifiedProduct": {
            "description": "description",
            "id": 7,
            "name": "new bookmark",
            "price": 2.1
        },
        "result": 1
      }

  
  ##### Endpoint DELETE **/api/products/:id**
  
    The sample query, DELETE http://localhost:9000/api/profiles/7

    Body : none;

    Response :
      {
        "deletedProduct": {
            "description": "description",
            "id": 7,
            "name": "new bookmark",
            "price": 2.1
        },
        "result": 1
      }

  ##### Middleware verify_product_id

    check if the product id exists in the **products** table
  
  ##### Middleware verify_new_products

    verify {name, descriptoin, prices} values

===================================================================================
#### milestone 05 - create five API end points for orders

  ##### Endpoint GET **/api/orders/**

    The sample query, GET http://localhost:9000/api/orders/

    Body : none;

    Response :
      [
        {
          "id": 4,
          "order_id": 2,
          "product_id": 4,
          "quantity": 5,
          "status": "pending",
          "user_id": 4
        },
        {
            "id": 5,
            "order_id": 3,
            "product_id": 5,
            "quantity": 5,
            "status": "pending",
            "user_id": 5
        },
        ...
      ]


  ##### Endpoint GET **/api/orders/:id**

    The sample query, GET http://localhost:9000/api/orders/4

    Body : none;

    Response :
      [
        {
          "id": 4,
          "order_id": 2,
          "product_id": 4,
          "quantity": 5,
          "status": "pending",
          "user_id": 4
        }
      ]

  ##### Endpoint POST **/api/orders/**

    The sample query, POST http://localhost:9000/api/orders/

    Body : 
      {
        "order_number": 3124,
        "product_id": 1,
        "quantity": 100,
        "status": "pending",
        "user_id": 2
      }

    Response :
      {
        "newOrder": {
            "id": 7,
            "order_number": 3124,
            "product_id": 1,
            "quantity": 100,
            "status": "pending",
            "user_id": 2
        },
        "result": 1
      } 


  ##### Endpoint PUT **/api/orders/:id**

    The sample query, PUT http://localhost:9000/api/orders/7

    Body :
      {
        "order_number": 3124,
        "product_id": 1,
        "quantity": 1000,
        "status": "pending",
        "user_id": 2
      }

    Response :
      {
        "modifiedOrder": {
            "id": 7,
            "order_number": 3124,
            "product_id": 1,
            "quantity": 1000,
            "status": "pending",
            "user_id": 2
        },
        "result": 1
      }


  ##### Endpoint DELETE **/api/orders/:id**

    The sample query, DELETE http://localhost:9000/api/orders/5

    Body : none;

    Response :
      {
        "deletedOrder": {
            "id": 7,
            "order_number": 3124,
            "product_id": 1,
            "quantity": 1000,
            "status": "pending",
            "user_id": 2
        },
        "result": 1
      }

  ##### Middleware verify_order_id

    ensure the {id} exists in **orders** table
  
  ##### Middle verify_new_order

    ensure {order_number, product_id, quantity, status, user_id} are valid inputs.

===================================================================================
#### milestone 06 - create tests
   
  Created tests using Jest and Supertest for the following:
  * middleware-verify.js, middleware-verify.test.js
  * server.js, server.test.js
  * orders-router.js, orders-routers.test.js
  * products-router.js, products-router.test.js
  * profiles-router.js, profiles-router.test.js
  * users-router.js, users-router.test.js


===================================================================================

#### milestone 07 - create five API end points using multiple tables