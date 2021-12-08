const modelProducts = require("./products-model");
const {verifyNumber, verifyString, verifyStringLength, verifyEmptyArray} = require("../middleware-verify");

async function verify_product_id(req, res, next){
    const {id} = req.params;
    if (!verifyNumber(id)){
        res.status(400).json({message:`invalid product id ${id}`});
    }else{
        const array = await modelProducts.getById(id);
        if(verifyEmptyArray(array)){
            res.status(400).json({message:`product id ${id} not found`});
        }else{
            req.array = array;
            next();
        }
    }
}

async function verify_new_product(req, res, next){
    const {name, description, price} = req.body;
    if(!verifyString(name) || !verifyStringLength(3, 20, name)){
        res.status(400).json({message: "name msut be betwee 2 and 20 characters long"});
    }else if(!verifyString(description)){
        res.status(400).json({message: "description cannot be empty"});
    }else if(!verifyNumber(price)){
        res.status(400).json({message: "price must be a number"});
    }else{
        next();
    }
}

module.exports = {verify_new_product, verify_product_id};
