const express = require("express");
const routerUsers = require("./users/users-router");
const routerProfiles = require("./profiles/profiles-router");
const routerProducts = require("./products/products-router");
const routerOrders = require("./orders/orders-router");
const {errorHandler} = require("./errorhandler");

const server = express();
server.use(express.json());

server.get("/", (req, res)=>{
    res.status(200).json({message:"Hello World from server"});
})

server.use("/api/users", routerUsers);
server.use("/api/profiles",routerProfiles);
server.use("/api/products", routerProducts);
server.use("/api/orders", routerOrders);

server.use((req, res)=>{   
    res.status(404).json({message:`path ${req.path} not found`});
})

server.use(errorHandler);

module.exports = server;
