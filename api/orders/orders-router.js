const express = require("express");
const router = express();
const model = require("./orders-model");
const errorHandler = require("../errorhandler");
const modelOrders = require("./orders-model");
const middlewareOrders = require("./orders-middleware");
const middlewareProducts = require("../products/products-middleware");
const middlewareUsers = require("../users/users-middleware");

router.get("/", async (req, res, next)=>{
    try{
      const array = await modelOrders.getOrders();
      res.status(200).json(array);
    }catch(err){
      next(err);
    }
  })

router.get("/:id", middlewareOrders.verify_order_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const array = await modelOrders.getOrderById(id);
      res.status(200).json(array);
  }catch(err){
    next(err);
  }
})

router.post("/", middlewareOrders.verify_new_order, middlewareProducts.verify_product_id, middlewareUsers.verify_user_id, async (req, res, next)=>{
  try{
    const {order_id, product_id, quantity, status, user_id} = req.body;
    const array = await modelOrders.addOrder({order_id, product_id, quantity, status, user_id});
    const new_order_id = array[0];
    const new_order = await modelOrders.getOrderById(new_order_id);
    res.status(201).json({result:1, newOrder:new_order});
  }catch(err){
    next(err);
  }
});

router.put("/:id", middlewareOrders.verify_order_id, middlewareOrders.verify_new_order, middlewareProducts.verify_product_id, middlewareUsers.verify_user_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const {order_id, product_id, quantity, status, user_id} = req.body;
    const result = await modelOrders.modifyOrder(id, {order_id, product_id, quantity, status, user_id});
    const modifiedOrder = await modelOrders.getOrderById(id);
    res.status(201).json({result, modifiedOrder});
  }catch(err){
    next(err);
  }
});

router.delete("/:id", middlewareOrders.verify_order_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const result = await modelOrders.removeOrder(id);
    res.status(201).json({result, deletedOrder:req.array[0]});
  }catch(err){
    next(err);
  }
})

router.use("*", (req, res)=>{
  res.status(404).json({message:`invalid path /api/orders${req.path}`});
})

router.use(errorHandler);
  
module.exports = router;