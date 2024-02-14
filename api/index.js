const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://johamo5905:Alex49mqt20052006@cluster0.wlj99o2.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("Connect to MongoDB")
}).catch((err) => {
    console.log("Error Connecting to MongoDB");
})

app.listen(port,() => {
    console.log("server is running on port 3000")
})