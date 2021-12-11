const express = require("express");
const router = express();
const model = require("./profiles-model");
const modelProfiles = require("./profiles-model");
const {verifyNewProfile, verifyProfileId} = require("./profiles-middleware");
const {verify_user_id} = require("../users/users-middleware");

router.use(express.Router());

router.get("/", async (req, res, next)=>{
    try{
      const array = await modelProfiles.getAll();
      res.status(200).json(array);
    }catch(err){
      next(err);
    }
  })

router.get("/:id", verifyProfileId, async (req, res, next)=>{
  try{
    res.status(200).json(req.array);
  }catch(err){
    next(err);
  }
})

router.post("/", verifyNewProfile, verify_user_id, async (req, res, next)=>{
  try{
    const {first_name, middle_name, last_name, email, user_type, user_id} = req.body;
    const array = await modelProfiles.addProfile(
        {first_name, middle_name, last_name, email, user_type, user_id});
    const new_profile_id = array[0];
    const newProile = await modelProfiles.getById(new_profile_id);
    res.status(201).json({result:1, newProfile:newProile[0]});
  }catch(err){
    next(err);
  }
});

router.put("/:id", verifyProfileId, verifyNewProfile, verify_user_id, 
  async (req, res, next)=>{
  try{
    const {first_name, middle_name, last_name, email, user_type, user_id} = req.body;
    const {id} = req.params;
    const result = 
      await modelProfiles.modifyProfile(
        id, {first_name, middle_name, last_name, email, user_type, user_id}
      );
    const array = await model.getById(id);
    res.status(201).json({result, modifiedProfile:array[0]});
  }catch(err){
    next(err);
  }
});

router.delete("/:id", verifyProfileId, async (req, res, next)=>{
  try{
    const {id} = req.params;
    const result = await modelProfiles.deleteProfile(id);
    res.status(200).json({result, deletedProfile:req.array[0]});
  }catch(err){
    next(err);
  }
})
  
module.exports = router;
