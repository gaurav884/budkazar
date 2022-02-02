const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    cart: [{
        type: ObjectId,
        ref: "Product"
    }],
    wishlist: [{
        type: ObjectId,
        ref: "Product"
    }],
    orders: [{
        type: ObjectId,
        ref: "Order"
    }],
    resetToken: {
        type: String
    },
    expireToken: {
        type: String
    }


})

const User = mongoose.model("User", userSchema);

module.exports = User;