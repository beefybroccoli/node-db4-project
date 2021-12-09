const modelProducts = require("./products-model");
const {verifyNumber, verifyString, verifyStringLength, verifyEmptyArray} = require("../middleware-verify");

async function verify_product_id(req, res, next){
    const product_id = 'product_id' in req.body ? req.body.product_id : req.params.id  ;
    if (!verifyNumber(product_id)){
        res.status(400).json({message:`invalid product id ${product_id}`});
    }else{
        const array = await modelProducts.getById(product_id);
        if(verifyEmptyArray(array)){
            res.status(400).json({message:`product id ${product_id} not found`});
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
