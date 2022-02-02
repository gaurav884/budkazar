const User = require("../models/user")
const Product = require("../models/product")

module.exports=(req ,res , next) => {
    Product.find({_id:{$in:req.body.cart}}).exec((err , found)=>{
        if(found){
            req.cart = found;
            next();
        }
        else{
            res.json({error:err})
        }
    })

}