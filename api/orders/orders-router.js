const express = require("express");
const router = express();
const modelOrders = require("./orders-model");
const {verify_order_id, verify_new_order} = require("./orders-middleware");
const {verify_product_id} = require("../products/products-middleware");
const {verify_user_id} = require("../users/users-middleware");

router.use(express.Router());

router.get("/", async (req, res, next)=>{
    try{
      const array = await modelOrders.getOrders();
      res.status(200).json(array);
    }catch(err){
      next(err);
    }
  })

router.get("/:id", verify_order_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const array = await modelOrders.getOrderById(id);
      res.status(200).json(array);
  }catch(err){
    next(err);
  }
})

router.post("/", verify_new_order, verify_product_id, verify_user_id, async (req, res, next)=>{
  try{
    const {order_number, product_id, quantity, status, user_id} = req.body;
    const array = await modelOrders.addOrder({order_number, product_id, quantity, status, user_id});
    const new_order_id = array[0];
    const new_order = await modelOrders.getOrderById(new_order_id);
    res.status(201).json({result:1, newOrder:new_order[0]});
  }catch(err){
    next(err);
  }
});

router.put("/:id", verify_order_id, verify_new_order, verify_product_id, verify_user_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const {order_number, product_id, quantity, status, user_id} = req.body;
    const result = await modelOrders.modifyOrder(id, {order_number, product_id, quantity, status, user_id});
    const modifiedOrder = await modelOrders.getOrderById(id);
    res.status(201).json({result, modifiedOrder:modifiedOrder[0]});
  }catch(err){
    next(err);
  }
});

router.delete("/:id", verify_order_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const result = await modelOrders.removeOrder(id);
    res.status(201).json({result, deletedOrder:req.array[0]});
  }catch(err){
    next(err);
  }
})
  
module.exports = router;
