const express = require("express");
const router = express();
const model = require("./profiles-model");
const errorHandler = require("../errorhandler");
const modelProiles = require("./profiles-model");
const middlewareProfiles = require("./profiles-middleware");
const middlewareUsers = require("../users/users-middleware");

router.get("/", async (req, res, next)=>{
    try{
      const array = await modelProiles.getAll();
      res.status(200).json(array);
    }catch(err){
      next(err);
    }
  })

router.get("/:id", middlewareProfiles.verifyProfileId, async (req, res, next)=>{
  try{
    res.status(200).json(req.array);
  }catch(err){
    next(err);
  }
})

router.post("/", middlewareProfiles.verifyNewProfile, middlewareUsers.verify_user_id, async (req, res, next)=>{
  try{
    const {first_name, middle_name, last_name, email, user_type, user_id} = req.body;
    const array = await modelProiles.addProfile({first_name, middle_name, last_name, email, user_type, user_id});
    const new_profile_id = array[0];
    const newProile = await modelProiles.getById(new_profile_id);
    res.status(201).json({result:1, newProfile:newProile[0]});
  }catch(err){
    next(err);
  }
});

router.put("/:id", middlewareProfiles.verifyProfileId, middlewareProfiles.verifyNewProfile, middlewareUsers.verify_user_id, async (req, res, next)=>{
  try{
    const {first_name, middle_name, last_name, email, user_type, user_id} = req.body;
    const {id} = req.params;
    const result = await modelProiles.modifyProfile(id, {first_name, middle_name, last_name, email, user_type, user_id});
    const array = await model.getById(id);
    res.status(201).json({result, modifiedProfile:array[0]});
  }catch(err){
    next(err);
  }
});

router.delete("/:id", middlewareProfiles.verifyProfileId, async (req, res, next)=>{
  try{
    // res.status(503).json({method:"DELETE",status:503,message:`reach PATH /api/profiles${req.path}`});
    const {id} = req.params;
    const result = await modelProiles.deleteProfile(id);
    res.status(200).json({result, deletedProfile:req.array[0]});
  }catch(err){
    next(err);
  }
})

router.use("*", (req, res)=>{
    res.status(404).json({message:`invalid path /api/profiles${req.path}`});
  })

router.use(errorHandler);
  
module.exports = router;