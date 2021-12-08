const modelOrders = require("./orders-model");
const {verifyEmptyArray, verifyString, verifyStringLength, verifyNumber,verifyOrderStatus} = require("../middleware-verify");

async function verify_order_id (req, res, next){
    const {id} = req.params;
    if(!verifyNumber(id)){
        res.status(400).json({message:`invalid order id ${id}`});
    }else{
        const array = await modelOrders.getOrderById(id);
        if(verifyEmptyArray(array)){
            res.status(400).json({message:`order id ${id} not found`});
        }else{
            req.array = array;
            next();
        }

    }
}

async function verify_new_order(req, res,next){
    const {order_number, product_id, quantity, status, user_id} = req.body;
    if(!verifyNumber(order_number)){
        res.status(400).json({message:`invalid order_id, must be non-negative number`})
    }else if(!verifyNumber(product_id)){
        res.status(400).json({message:`invalid product_id, must be non-negative number`})
    }else if(!verifyNumber(quantity)){
        res.status(400).json({message:`invalid order_id, must be non-negative number`})
    }else if(!verifyNumber(user_id)){
        res.status(400).json({message:`invalid user_id, must be non-negative number`})
    }else if(!verifyString(status) || !verifyOrderStatus(status)){
        //return (order_status === "pending" || order_status === "shipped" || order_status === "delievered");
        res.status(400).json({message:`invalid status, must be pending, shipped or delievered`});
    }else{
        next();
    }   
}

module.exports ={verify_order_id, verify_new_order};