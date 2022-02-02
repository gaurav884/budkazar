const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/user")
const CaraImage = require("../models/caraImages")




router.post("/add-cara-image" , (req, res) => {
    const {title , linktoProduct , linktoImage} = req.body;
    if(!title || !linktoProduct || !linktoImage){
        res.json("please enter all the fields correctly")
    }
    else{
    const newone = new CaraImage({
        title,
        linktoProduct,
        linktoImage,
    })
    newone.save();
    res.json("added successfully")
    }
})

router.get("/get-cara-images" , (req, res) => {
    CaraImage.find({}).exec((err ,found)=>{
        if(found){
              res.json({found})
        }
        else{
          res.json({error:err})
        }
    })
})

module.exports = router;