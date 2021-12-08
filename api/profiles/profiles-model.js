const db = require("../../database/db-config");

async function getAll(){
    return await db("profiles");
}

async function getById(id){
    return await db("profiles").where("id", id);
}

async function addProfile(profile){
    return await db("profiles").insert(profile);
}

async function modifyProfile(id, profile){
    return await db("profiles").update(profile).where("id", id);
}

async function deleteProfile(id){
    return db("profiles").where("id", id).del();
}

module.exports = {getAll, getById, addProfile, modifyProfile, deleteProfile} ;