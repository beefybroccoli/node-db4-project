const middlewareUsers = require("./users-model");
const {verifyNumber, verifyString} = require("../middleware-verify");

async function verify_user_id(req, res, next){
    const {id} = req.params;
    console.log("typeof id = ", typeof id );
    if(isNaN(id)){
        res.status(400).json({message:`invalid id - ${id}`});
    }else{
        const array = await middlewareUsers.getById(id);
        // console.log("array = ", array);

        if (array.length === 0){
            res.status(404).json({message:`id ${id} not found`});
        }else{
            req.user = array[0];
            console.log("req.user = ", req.user);
            next();
        }
    }
}

async function verify_new_user(req, res, next){
    const {username, password} = req.body;
    if(!verifyString(username) || !verifyString(password)){
        res.status(400).json({message:"invalid username or password"});
    }else{
        next();
    }
}

async function verify_unique_user(req, res, next){
    if (true){

    }else{
        next();
    }
}

async function verify_existing_user(req, res, next){
    if (true){

    }else{
        next();
    }
}

module.exports = {verify_existing_user,verify_new_user, verify_unique_user,verify_user_id};