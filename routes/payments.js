const dotenv = require("dotenv")
.config()
const FindProducts = require("../middleware/FindProducts")
const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
const router = express.Router();
const requiredLogin = require("../middleware/requiredLogin")
const User = require("../models/user")
const Order = require("../models/order")
const nodemailer = require('nodemailer');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
var checkoutcart
var from


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.NOTIFICATION_EMAIL,
      pass: process.env.NOTIFICATION_EMAIL_PASS
  }
})

router.get('/order/success', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);


  User.findOne({ email: customer.email }).then((user) => {
    const userpass = user.password;
    user.password = undefined;
    const neworder = new Order({
      product: checkoutcart,
      boughtby: user._id,
      boughton: new Date().toISOString().split('T')[0],
      status: "confirmed"
    })

    neworder.save();
    user.password = userpass;
    user.orders.push(neworder)
    if (from === "cart") {
      user.cart = [];
    }
    user.save()

    transporter.sendMail({
      from: process.env.NOTIFICATION_EMAIL,
      to: user.email,
      subject: `Order Success`,
      html:` <h1>Thanks for purchasing the product from budkazar</h1>`
      
  }, (err, info) => {
      if (err) {
          console.log(err)
      }
      else {
          console.log(info.response)
      }
  })
     
    res.redirect(process.env.PURCHASE_SUCCESS_URL)

  }).catch(err => {
    console.log(err)
  })


});

router.post("/create-checkout-session", requiredLogin, FindProducts, async (req, res) => {
  try {
    from = req.body.from
    checkoutcart = req.cart
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.user.email,
      line_items: req.cart.map(item => {
        let discountedPrice = Math.floor((parseInt(item.price) * (100 - parseInt(item.discount))) / 100)
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
            },
            unit_amount: discountedPrice * 100,
          },
          quantity: 1,
        }
      }),

      success_url:  process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_FALIURE_URL,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})


module.exports = router;