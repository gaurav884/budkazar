const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    product: [{
        type: ObjectId,
        ref: "Product"
    }],
    boughtby: {
        type: ObjectId,
        ref: "User"
    },
    boughton:{
        type :Object,
        required:true
    },
   status:{
      type:String,
      required: true 
   },
  

},{timestamps:true})

const Order = mongoose.model("Order", userSchema);

module.exports = Order;