const db = require("../../database/db-config");

async function getAll(){
    return await db("users");
}

module.exports = {getAll};