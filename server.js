const dotenv = require("dotenv")
    .config()
const express = require('express')
const mongoose = require("mongoose")


const app = express();

app.use(express.json());

mongoose.connect(process.env.mongoURI)
mongoose.connection.on("connected", () => {
    console.log("mongoose connected");
})
mongoose.connection.on("error", (err) => {
    console.log(err);
})


const port = process.env.PORT || 3002;

app.use("/auth", require("./routes/auth"))
app.use("/user", require("./routes/user"))
app.use("/product", require("./routes/product"))
app.use("/misc", require("./routes/caraImages"))
app.use("/payment", require("./routes/payments.js"))

if (process.env.NODE_ENV == "production") {
    console.log(process.env.NODE_ENV)
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
else {
    app.get("/", (req, res) => {
        res.send("api running")
    })
}

app.listen(port, () => {
    console.log(`server is up and running on ${port}`)
})