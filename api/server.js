const express = require("express");

const server = express();
server.use(express.json());
server.use(express.Router());

server.get("/", (req, res)=>{
    res.status(200).json({message:"Hello World from server"});
})

server.get("*", (req, res)=>{   
    res.status(404).json({message:`path ${req.path} not found`});
})

module.exports = server;