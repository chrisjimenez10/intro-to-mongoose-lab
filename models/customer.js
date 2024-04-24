//Import
const mongoose = require("mongoose");

//Customer Schema
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

//Customers Model (Collection)
const Customer = mongoose.model("Customer", customerSchema);

//Exporting Model
module.exports = Customer;

