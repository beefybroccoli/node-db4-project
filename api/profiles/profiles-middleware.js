const modelProfiles = require("./profiles-model");
const {verifyNumber, verifyString, verifyEmptyArray, verifyStringLength, verifyUserType} = require("../middleware-verify");
const modelUsers = require("../users/users-model");

async function verifyProfileId(req, res, next) {
    const {id} = req.params;
    if (!verifyNumber(id)){
        res.status(400).json({message:`invalid id ${id}`});
    }else{
        const array = await modelProfiles.getById(id);
        if(verifyEmptyArray(array)){
            res.status(400).json({message:`id ${id} not found`});
        }else{
            req.array = array;
            next();
        }
    }
}

async function verify_user_id(req, res, next){
    const {user_id} = req.body;
    const array = await modelUsers.getById(user_id);

    if (verifyEmptyArray(array)){
        res.status(404).json({message:`user_id ${user_id} not found`});
    }else{
        next();
    }
}

async function verifyNewProfile(req, res, next) {
    const {first_name, middle_name, last_name, email, user_type, user_id} = req.body;
    if (!verifyString(first_name) || !verifyStringLength(2,20,first_name)){
        res.status(400).json({message:"first_name must be string, 2 to 20 characters long"})
    }else if (!verifyString(middle_name)){
        res.status(400).json({message:"middle_name must be string"})
    }else if (!verifyString(last_name) || !verifyStringLength(2, 20,last_name)){
        res.status(400).json({message:"last_name must be string, 2 to 20 characters long"})
    }else if (!verifyString(email) || !verifyStringLength(2, 20,email)){
        res.status(400).json({message:"email must be string, 2 to 20 characters long"})
    }else if (!verifyString(user_type) || !verifyUserType(user_type)){
        res.status(400).json({message:"user_type must be 'user' or 'admin'"})
    }else if (!verifyNumber(user_id) || user_id < 0){
        res.status(400).json({message:"user_id must be a positive number"})
    }else{
        next();
    }
    
}

module.exports = {verifyProfileId,verifyNewProfile, verify_user_id};