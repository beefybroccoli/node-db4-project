const db = require("../../database/db-config");

async function getAll(){
    return await db("products");
}

async function getById(id){
    return await db("products").where("id", id);
}

async function addProduct(product){
    return await db("products").insert(product);
}

async function modifyProduct(id, product){
    return await db("products").update(product).where("id", id);
}

async function removeProduct(id){
    return await db("products").where("id", id).del();
}

module.exports = {getAll, getById, addProduct, modifyProduct, removeProduct};