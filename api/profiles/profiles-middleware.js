const modelProfiles = require("./profiles-model");
const {verifyNumber, verifyString, verifyEmptyArray, 
    verifyStringLength, verifyUserType, verifyUndefined} 
    = require("../middleware-verify");
const modelUsers = require("../users/users-model");

async function verifyProfileId(req, res, next) {
    const profile_id = 'user_id' in req ? req.body.profile_id : req.params.id ;
    if (!verifyNumber(profile_id)){
        res.status(400).json({message:`invalid profile id ${profile_id}`});
    }else{
        const array = await modelProfiles.getById(profile_id);
        if(verifyEmptyArray(array)){
            res.status(400).json({message:`profile id ${profile_id} not found`});
        }else{
            req.array = array;
            next();
        }
    }
}

async function verifyNewProfile(req, res, next) {
    const {first_name, middle_name, last_name, email, user_type, user_id} = req.body;
    if (verifyUndefined(first_name) || verifyUndefined(last_name) || verifyUndefined(email) || verifyUndefined(user_id)){
        res.status(400).json({message:"require first_nam, last_name, email, user_id"})
    }else if (!verifyString(first_name) || !verifyStringLength(2,20,first_name)){
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
        next({status:400, message:"user_id must be a positive number"});
    }else{
        next();
    }
    
}

module.exports = {verifyProfileId,verifyNewProfile};
