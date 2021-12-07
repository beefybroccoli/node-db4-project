const db = require("../../database/db-config");

async function getAll(){
    return await db("users");
}

async function getById(id){
    return await db('users').where('id', id);
}

async function addUser(user){

}

async function modifyUser(id, user){

}

async function deleteUser(id){
    return await db('users').where('id', id).del();
}

module.exports = {getAll, getById, addUser,modifyUser,deleteUser};