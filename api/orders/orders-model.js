const db = require("../../database/db-config");

async function getOrders(){
    return await db("orders");
}

async function getOrderById(id){
    return await db("orders").where("id",id);
}

async function addOrder(order){
    return await db("orders").insert(order);
}

async function modifyOrder(id, order){
    return await db("orders").update(order).where("id", id);
}

async function removeOrder(id){
    return await db("orders").where("id", id).del();
}

module.exports = {getOrders, getOrderById, addOrder, modifyOrder,removeOrder}