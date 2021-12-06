const express = require("express");
const router = express();
const model = require("./users-model");

router.get("/", async (req , res, next)=>{
    try{
        const users =  await model.getAll();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      sageAdvice: 'Finding the real error is 90% of the bug fix',
      message: err.message,
      stack: err.stack,
    })
  })
  

module.exports = router;