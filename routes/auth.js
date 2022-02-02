const dotenv = require("dotenv")
    .config()
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto")
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NOTIFICATION_EMAIL,
        pass: process.env.NOTIFICATION_EMAIL_PASS
    }
})
router.post("/sign-in/hgjghgu76t78ufu6rf67uftf", (req, res) => {
    const { email, password } = req.body

    if (!email, !password) {
        res.json({ error: "please enter all the fields" })
    }

    else {
        User.findOne({ email: email }, (err, found) => {
            if (!found) {
                res.json({ error: "no account exist by this email" })
            }
            else {
                bcrypt.compare(password, found.password).then(domatch => {
                    if (domatch) {
                        const token = jwt.sign({ _id: found._id }, process.env.JWT_Secret)

                        res.json({ token: token, user: { _id: found._id, name: found.name, email: found.email } })
                    }
                    else {
                        res.json({ error: "username and password does not match" })
                    }
                })

            }
        })
    }
})

router.post("/sign-up/jfvuyfyt76rytufhjfjhgf", (req, res) => {
 
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.json({ error: "please enter all the fields" })
    }
    else {
        User.findOne({ email: email }, (err, found) => {
            if (found) {
                res.json({ error: "email already exist" })
            }
            else {
                bcrypt.hash(password, 12).then(hashedpassword => {
                    const newone = new User({
                        name: name,
                        password: hashedpassword,
                        email: email
                    })
                    newone.save();
                    res.json("account created sucessfully")
                })
            }
        })
    }
})

router.patch("/forgot-password/987y78gyfy54etdrdg", (req, res) => {

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            return res.json({ error: err })
        }
        else {
            const token = buffer.toString("hex")


            User.findOne({ email: req.body.email }).then(user => {
                if (!user) {

                    res.json({ error: "User not found" })
                }
                else {
                    user.resetToken = token;
                    user.expireToken = Date.now() + 300000;
                    user.save().then((result) => {
                        transporter.sendMail({
                            from: process.env.NOTIFICATION_EMAIL,
                            to: req.body.email,
                            subject: `Password reset`,
                            html: `
                             <h1>Password reset request</h1>
                             <h2>Click on the link <a href="http://localhost:3000/reset-password/${token}">here</a> to change the password</h2>
                             `

                        }, (err, info) => {
                            if (err) {
                                console.log(err)
                            }
                            
                        })
                    })
                    res.json(`check your email`)
                }
            })
        }
    })
})

router.patch("/reset-password/jhvuyf678rfytfd767dyft", (req, res) => {
    const sentToken = req.body.resetToken;
    const newPass = req.body.newPass;

    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } }).then(user => {
        if (!user) {
            res.json({ error: "token has expired" })
        }
        else {
            bcrypt.hash(newPass, 12).then(hashedPassword => {
                user.password = hashedPassword;
                user.resetToken = undefined;
                user.expireToken = undefined;
                user.save().then(result => {
                    res.json({ message: "updated sucessfully" })
                })

            })
        }
    })
        .catch(err => {
            res.json({ error: err })
        })
})



module.exports = router;