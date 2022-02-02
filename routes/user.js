const express = require('express');
const router = express.Router();
const User = require("../models/user")
const Product = require("../models/product")
const requiredLogin = require("../middleware/requiredLogin")
const bcrypt = require('bcrypt');
const Order = require("../models/order")


router.get("/get-wishlist-cart", requiredLogin, (req, res) => {
    
    User.findOne({ _id: req.user._id }).select("wishlist cart orders -_id").populate("wishlist cart orders").exec((err, found) => {
        if (err) {

            res.json({ error: err })
        }
        else {
            
            res.json({ found })
        }
    })
})

router.get("/get-orders", requiredLogin, (req, res) => {

    User.findOne({ _id: req.user._id }).select("orders ").populate({
        path: 'orders',
        model: 'Order',
        populate: {
            path: 'product',
            model: 'Product',
        }
    }).populate({
        path: 'orders',
        model: 'Order',
        populate: {
           
            path: 'boughtby',
            model: 'User'
        }
    }).exec((err, found) => {
        if (err) {

            res.json({ error: err })
        }
        else {
            res.json({ found })
        }
    })
})
router.get("/get-wishlist-cart-array", requiredLogin, (req, res) => {

    User.findOne({ _id: req.user._id }).select("wishlist cart -_id").exec((err, found) => {
        if (err) {
            console.log(`hey`)
            res.json({ error: err })
        }
        else {
            res.json({ found })
        }
    })
})

router.patch("/remove-from-cart", requiredLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { $pull: { cart: req.body.prodID } }, { new: true }).select("-password -email -name").populate("cart").exec((err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ result })
        }
    })
})

router.patch("/remove-from-wishlist", requiredLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.body.prodID } }, { new: true }).select("-password -email -name").populate("wishlist").exec((err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ result })
        }
    })
})

router.patch("/add-to-cart", requiredLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { $push: { cart: req.body.prodID } }, { new: true }).select("-password -email -name").exec((err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ result })
        }
    })
})

router.patch("/add-to-wishlist", requiredLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { $push: { wishlist: req.body.prodID } }, { new: true }).select("-password -email -name").exec((err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ result })
        }
    })
})

router.patch("/change-name", requiredLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { name: req.body.name }, { new: true }).select("-password").exec((err, result) => {
        if (result) {
            res.json({ result })
        }
        else {
            res.json({ error: err })
        }
    })
})

router.patch("/change-password", requiredLogin, (req, res) => {
    const { oldPass, newPass } = req.body;
    bcrypt.compare(oldPass, req.user.password).then(doMatch => {
        if (doMatch) {

            bcrypt.hash(newPass, 12).then(hashedPassword => {
                User.findByIdAndUpdate({ _id: req.user._id }, { password: hashedPassword }).then(done => {

                    res.json("Password updated Succuessfully")

                }).catch(err => {
                    res.json({ error: err })
                })



            })
        }
        else {
            res.status(403).json({ error: "incorrect old password " })
        }

    }).catch(err => {
        console.log(err);
    })

})

router.post("/password-check", requiredLogin, (req, res) => {
    User.findOne({ _id: req.user._id }).exec((err, found) => {
        if (found) {
            bcrypt.compare(req.body.Password, found.password).then(doMatch => {
                if (doMatch) {
                    res.json({ sucess: "match" })
                }
                else {
                    res.status(403).json({ error: "do not match" })
                }

            }).catch(err => {
                console.log(err);
            })


        }
        else {
            res.status(403).json({ error: "not found" });
        }
    })

})

router.delete("/delete-account", requiredLogin, (req, res) => {

    User.findByIdAndRemove({ _id: req.user._id }, { new: true }).exec((err, done) => {
        if (done) {
            res.json({ sucess: "deleted" })

        }
        else {
            res.status(403).json({ error: err });
        }


    })






})
module.exports = router;