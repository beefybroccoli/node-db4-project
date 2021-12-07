const middlewareUsers = require("./users-model");
const {verifyNumber, verifyString, verifyStringLength} = require("../middleware-verify");

async function verify_user_id(req, res, next){
    const {id} = req.params;
    // console.log("typeof id = ", typeof id );
    if(verifyNumber(id)){
        res.status(400).json({message:`invalid id - ${id}`});
    }else{
        const array = await middlewareUsers.getById(id);

        if (array.length === 0){
            res.status(404).json({message:`id ${id} not found`});
        }else{
            req.user = array[0];
            // console.log("req.user = ", req.user);
            next();
        }
    }
}

async function verify_new_user(req, res, next){
    const {username, password} = req.body;
    if(!verifyString(username) || !verifyString(password)){
        res.status(400).json({message:"invalid username or password"});
    }else if(!verifyStringLength(5, 20, username) || !verifyStringLength(5, 20, password)){
        res.status(400).json({message:"username or password length need to be bertween 5 and 20"});
    }else{
        next();
    }
}

async function verify_unique_user(req, res, next){
    if (false){

    }else{
        next();
    }
}

module.exports = {verify_new_user, verify_unique_user,verify_user_id};