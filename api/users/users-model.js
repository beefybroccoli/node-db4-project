const db = require("../../database/db-config");

async function getAll(){
    return await db("users");
}

async function getById(id){
    return await db('users').where('id', id);
}

async function addUser(user){
    return await db('users').insert(user);
}

async function modifyUser(id, user){
    return await db('users').update(user).where("id", id);
}

async function deleteUser(id){
    return await db('users').where('id', id).del();
}

module.exports = {getAll, getById, addUser,modifyUser,deleteUser};