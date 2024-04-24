//Import modules
const dotenv = require("dotenv");
const prompt = require('prompt-sync')();
const mongoose = require("mongoose");
const Customer = require("./models/customer.js");

//
dotenv.config();

const username = prompt("What is your name? ");
console.clear(username);

//Connect Mongoose in Application to MongoDB (Inovke this Async Function to perform the requested action from user)
const connectCreate = async (customerName, customerAge) => { //NOTE: We need to inlude the parameters in ALL the fuctions we are using or invoking
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    await createCustomer(customerName, customerAge); //Async Operation we want to run on database (ENSURE to include the parameters that hold the input value from prompt() )
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
}

const connectViewAll = async () => { 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    await viewAllCustomers();
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
}

const connectDelete = async (customerId) => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    await viewAllCustomers();
    await deleteCustomer(customerId);
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
}




//CRUD Actions
    //Create Customer
const createCustomer = async (customerName, customerAge) => {
    const customerData = {
        name: customerName,
        age: customerAge,
    }
    const customer = await Customer.create(customerData);
    console.log("You have created:", customer);
}

    //View ALL Customers
const viewAllCustomers = async () => {
    const customersArray = await Customer.find();
    console.log("List of Total Customers:", customersArray);
}

    //Delete Customer
const deleteCustomer = async (customerId) => {
    const id = customerId;
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    console.log(`You have deleted:`, deletedCustomer);
}




//Start Application
    //Welcome Message
const welcomeMessage = `Welcome ${username}, to the CRM`;
console.log(welcomeMessage);
    //Menu System Interface
const menuSystem = `What would you like to do?

1. Create a Customer
2. View all Customers
3. Update a Customer
4. Delete a Customer
5. Quit`;
const userInput = `Please type number of action to run:`;

let userReply;
function menuSystemUI() {
    console.log(menuSystem);
    userReply = prompt(`${userInput} `);
    return userReply
}
menuSystemUI();

//Create Customer Logic
if(parseInt(userReply) === 1){ //Input from prompt()-sync is a string, so convert to number data type with parseInt() to satisfy our condition
    const customerName = prompt(`Please provide a name: `);
    const customerAge = prompt(`Please provide the age: `);
    connectCreate(customerName, customerAge);
//View All Logic
}else if(parseInt(userReply) === 2){
    connectViewAll();
//Delete Customer Logic
}else if(parseInt(userReply) === 4){
    console.log(`Please type the ID of customer you'd like to delete`);
    const customerId = prompt(`Customer ID: `);
    connectDelete(customerId);
}













