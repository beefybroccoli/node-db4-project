const express = require("express");
const router = express();
const modelUsers = require("./users-model");
const errorHandler = require("../errorhandler");
const middlewareUsers = require("./users-middleware");

router.get("/", async (req , res, next)=>{
    try{
        const users =  await modelUsers.getAll();
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

router.post("/", middlewareUsers.verify_new_user, async (req, res, next)=>{
  try{
    const {username, password} = req.body;
    const new_id = await modelUsers.addUser({username, password});
    const array = await modelUsers.getById(new_id[0]);
    res.status(201).json(array[0]);
  }catch(err){
    next(err);
  }
});

router.put("/:id", middlewareUsers.verify_user_id, middlewareUsers.verify_new_user, async (req, res, next)=>{
  try{
    const {username, password} = req.body;
    const {id} = req.params;
    const result = await modelUsers.modifyUser(id, {username, password});
    const modifiedUser = await modelUsers.getById(id);
    res.status(201).json({result, modifiedUser:modifiedUser[0]});
  }catch(err){
    next(err);
  }
});

router.delete("/:id", middlewareUsers.verify_user_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const result = await modelUsers.deleteUser(id);
    res.status(201).json({result, user:req.user});
  }catch(err){
    next(err);
  }
})

router.use("*", (req, res)=>{
  res.status(404).json({message:`invalid path /api/users${req.path}`});
})

router.use(errorHandler);
  
module.exports = router;