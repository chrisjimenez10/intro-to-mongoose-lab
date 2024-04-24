//Import modules
const dotenv = require("dotenv");
const prompt = require('prompt-sync')();
const mongoose = require("mongoose");
const Customer = require("./models/customer.js");

//
dotenv.config();

const username = prompt("What is your name?");

//Connect Mongoose in Application to MongoDB
const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    await createCustomer(); //Async Operation we want to run on database
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
}

const createCustomer = async () => {
    const customerData = {
        name: "Chris",
        age: 29,
    }
    const customer = await Customer.create(customerData);
    console.log("New Customer", customer);
}

connect(); //Invoking Async Function that connects to Database and performs our specificied interaction with the Database

