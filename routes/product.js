const express = require('express');
const router = express.Router();
const User = require("../models/user")
const Product = require("../models/product")
const requiredLogin = require("../middleware/requiredLogin")



router.post("/create", (req, res) => {
    const { title, developer, price, discount, platform, category, thumbnail, previewImages, coverImage, minReq, recomReq, description, keyFeatures } = req.body

    const newone = new Product({
        title,
        developer,
        price,
        discount,
        platform,
        category,
        thumbnail,
        previewImages,
        coverImage,
        minReq,
        recomReq,
        description,
        keyFeatures
    })

    newone.save();
    res.json("created sucessfully")
})


router.post("/all-products", (req, res) => {

    Product.find({}).sort("-createdAt").exec((err, found) => {
        if (found) {
            const newone = found.filter((each, index) => {
                if (index >= req.body.indexOfFirstProduct && index < req.body.indexofLastProduct) {
                    return each
                }
            })

            if (req.body.sortingMethod === 1) {

                const newdata = newone.sort((a, b) => {
                    let ratingA = 0
                    let ratingB = 0;
                    if (a.reviews && a.reviews.length > 0) {
                        a.reviews.forEach(each => {
                            ratingA = ratingA + parseInt(each.rating);
                        })
                        ratingA = ratingA / a.reviews.length;
                        if ((ratingA - Math.floor(ratingA)) > 0.5) {
                            ratingA = (Math.ceil(ratingA))
                        }
                        else {
                            ratingA = (Math.floor(ratingA))
                        }
                    }

                    if (b.reviews && b.reviews.length > 0) {
                        a.reviews.forEach(each => {
                            ratingB = ratingB + parseInt(each.rating);
                        })
                        ratingB = ratingB / b.reviews.length;
                        if ((ratingB - Math.floor(ratingB)) > 0.5) {
                            ratingB = (Math.ceil(ratingB))
                        }
                        else {
                            ratingB = (Math.floor(ratingB))
                        }
                    }

                    return ratingB - ratingA;

                })

                res.json({ found: newdata, total: found.length })
            }

            else if (req.body.sortingMethod === 2) {
                const newdata = newone.sort((a, b) => {
                    return (Math.floor((parseInt(b.price) * (100 - parseInt(b.discount))) / 100) - Math.floor((parseInt(a.price) * (100 - parseInt(a.discount))) / 100))
                })
                res.json({ found: newdata, total: found.length });
            }

            else if (req.body.sortingMethod === 3) {

                const newdata = newone.sort((a, b) => {
                    return (Math.floor((parseInt(a.price) * (100 - parseInt(a.discount))) / 100) - Math.floor((parseInt(b.price) * (100 - parseInt(b.discount))) / 100))
                })
               
                res.json({ found: newone, total: found.length });
            }

            else {
                res.json({ found: newone, total: found.length });
            }
        }

        else {
            res.json({ error: err })
        }
    })
})

router.get("/get-product/:productID", (req, res) => {
    console.log("hey")
    Product.findOne({ _id: req.params.productID }).populate("reviews.by").exec((err, found) => {
        if (found) {
            res.json(found);
        }
        else {
            res.json({ error: "err" })
        }
    })
})


router.post("/search", (req, res) => {

    if ((req.body.search).trim() === "") {
        res.json({ error: `empty` })
    }
    else {
        const queryReg = new RegExp(`^${req.body.search}`);

        Product.find({ title: { $regex: queryReg, $options: `i` } }).then((found) => {
            if (!found) {
                res.json({ error: "nothing found" })
            }
            else {

                res.json({ found })
            }


        }).catch(err => {
            res.json({ error: err })
        })
    }
})

router.patch("/review", requiredLogin, (req, res) => {
    const rev = {
        rating: req.body.RRating,
        text: req.body.review,
        by: req.user
    }

    Product.findByIdAndUpdate({ _id: req.body.prodID }, { $push: { reviews: rev } }, { new: true }).populate("reviews.by").exec((err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ result })
        }
    })

})


module.exports = router;