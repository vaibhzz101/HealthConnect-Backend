const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://thiteshubham:thiteshubham@cluster0.zphu3ww.mongodb.net/helthconnectpluse?retryWrites=true&w=majority");

module.exports = { connection };