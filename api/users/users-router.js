const express = require("express");
const router = express();
const modelUsers = require("./users-model");
const {verify_user_id, verify_new_user, verify_unique_user} = require("./users-middleware");

router.use(express.Router());

router.get("/", async (req , res, next)=>{
    try{
        const array =  await modelUsers.getAll();
        res.status(200).json(array);
    }catch(err){
        next(err);
    }
})

router.get("/:id", verify_user_id, (req, res, next)=>{
  try{
    res.status(200).json(req.user);
  }catch(err){
    next(err);
  }
})

router.post("/", verify_new_user, async (req, res, next)=>{
  try{
    const {username, password} = req.body;
    const new_id = await modelUsers.addUser({username, password});
    const array = await modelUsers.getById(new_id[0]);
    res.status(201).json({result: 1, createdUser:array[0]});
  }catch(err){
    next(err);
  }
});

router.put("/:id", verify_user_id, verify_new_user, async (req, res, next)=>{
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

router.delete("/:id", verify_user_id, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const result = await modelUsers.deleteUser(id);
    res.status(201).json({result, deletedUser:req.user[0]});
  }catch(err){
    next(err);
  }
})
  
module.exports = router;
