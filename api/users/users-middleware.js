const modelUsers = require("./users-model");

async function verify_user_id(req, res, next){
    const {id} = req.params;
    console.log("typeof id = ", typeof id );
    if(isNaN(id)){
        res.status(400).json({message:`invalid id - ${id}`});
    }else{
        const array = await modelUsers.getById(id);
        console.log("array = ", array);

        if (array.length === 0){
            res.status(404).json({message:`id ${id} not found`});
        }else{
            req.result = array[0];
            next();
        }
    }
}

async function verify_new_user(req, res, next){

}

async function verify_unique_user(req, res, next){

}

async function verify_existing_user(req, res, next){

}

module.exports = {verify_existing_user,verify_new_user, verify_unique_user,verify_user_id};