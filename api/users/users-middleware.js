const modelUsers = require("./users-model");
const {verifyNumber, verifyString, verifyStringLength, verifyUndefined} 
    = require("../middleware-verify");

async function verify_user_id(req, res, next){
    const input_id = 'user_id' in req.body ? req.body.user_id : req.params.id;
    if(!verifyNumber(input_id)){
        res.status(400).json({message:`invalid user id - ${input_id}`});
    }else{
        const array = await modelUsers.getById(input_id);

        if (array.length === 0){
            res.status(404).json({message:`user id ${input_id} not found`});
        }else{
            req.user = array;
            next();
        }
    }
}

async function verify_new_user(req, res, next){
    const {username, password} = req.body;
    if(verifyUndefined(username) || verifyUndefined(password)){
        res.status(400).json({message:"require username or password"});
    }
    else if(!verifyString(username) || !verifyString(password)){
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
