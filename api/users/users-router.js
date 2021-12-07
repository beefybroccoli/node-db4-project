const express = require("express");
const router = express();
const model = require("./users-model");
const errorHandler = require("../errorhandler");
const middlewareUsers = require("./users-middleware");

router.get("/", async (req , res, next)=>{
    try{
        const users =  await model.getAll();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
})

router.get("/:id", middlewareUsers.verify_user_id, (req, res, next)=>{
  try{
    res.status(200).json(req.user);
  }catch(err){
    next(err);
  }
})

router.post("/", async (req, res, next)=>{
  try{
    res.status(503).json({method:"POST",status:503,message:`reach PATH /api/users${req.path}`});
  }catch(err){
    next(err);
  }
});

router.put("/:id", async (req, res, next)=>{
  try{
    res.status(503).json({method:"PUT",status:503,message:`reach PATH /api/users${req.path}`});
  }catch(err){
    next(err);
  }
});

router.delete("/:id", middlewareUsers.verify_user_id, async (req, res, next)=>{
  try{
    // res.status(503).json({method:"DELETE",status:503,message:`reach PATH /api/users${req.path}`});
    const {id} = req.params;
    const result = await model.deleteUser(id);
    res.status(201).json({result, user:req.user});
  }catch(err){
    next(err);
  }
})

router.use(errorHandler);
  
module.exports = router;