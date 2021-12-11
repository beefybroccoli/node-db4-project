const express = require("express");
const router = express();
const modelProducts = require("./products-model");
const {verify_new_product, verify_product_id} = require("./products-middleware");

router.use(express.Router());

router.get("/", async (req, res, next)=>{
    try{
        const array = await modelProducts.getAll();
        res.status(200).json(array);
    }catch(err){
      next(err);
    }
  })

router.get("/:id", verify_product_id, async (req, res, next)=>{
  try{
      res.status(200).json(req.array);
  }catch(err){
    next(err);
  }
})

router.post("/", verify_new_product, async (req, res, next)=>{
  try{
    const {name, description, price} = req.body;
    const array = await modelProducts.addProduct({name, description, price});
    const new_product_id = array[0];
    const newProduct = await modelProducts.getById(new_product_id);
    res.status(200).json({result:1,newProduct:newProduct[0]});
  }catch(err){
    next(err);
  }
});

router.put("/:id", verify_product_id, verify_new_product, async (req, res, next)=>{
  try{
    const {name, description, price} = req.body;
    const {id} = req.params;
    const result = await modelProducts.modifyProduct(id, {name, description, price});
    const array = await modelProducts.getById(id);
    res.status(201).json({result, modifiedProduct:array[0]});
  }catch(err){
    next(err);
  }
});

router.delete("/:id", verify_product_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const result = await modelProducts.removeProduct(id);
    res.status(201).json({result, deletedProduct:req.array[0]});
  }catch(err){
    next(err);
  }
})
  
module.exports = router;
