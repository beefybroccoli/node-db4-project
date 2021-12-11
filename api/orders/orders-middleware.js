const modelOrders = require("./orders-model");
const {verifyEmptyArray, verifyString, verifyNumber, verifyOrderStatus} = 
    require("../middleware-verify");

async function verify_order_id (req, res, next){
    const input_id = 'order_id' in req.body ? req.body.order_id : req.params.id;
    if(!verifyNumber(input_id)){
        res.status(400).json({message:`invalid order id ${input_id}`});
    }else{
        const array = await modelOrders.getOrderById(input_id);
        if(verifyEmptyArray(array)){
            res.status(400).json({message:`order id ${input_id} not found`});
        }else{
            req.array = array;
            next();
        }
    }
}

async function verify_new_order(req, res,next){
    const {order_number, product_id, quantity, status, user_id} = req.body;
    const message = {err:""};
    if(!verifyNumber(order_number)){
        message.err = `invalid order_id, must be non-negative number`;
    }else if(!verifyNumber(product_id)){
        message.err = `invalid product_id, must be non-negative number`;
    }else if(!verifyNumber(quantity)){
        message.err = `invalid quantity, must be non-negative number`;
    }else if(!verifyNumber(user_id)){
        message.err = `invalid user_id, must be non-negative number`;
    }else if(!verifyString(status) || !verifyOrderStatus(status)){
        message.err = `invalid status, must be pending, shipped or delievered`;
    }   

    if (message.err = ""){
        res.status(400).json({message:message.err});
    }else{
        next();
    }
}

module.exports ={verify_order_id, verify_new_order};
