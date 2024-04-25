// //Import modules
// const dotenv = require("dotenv");
// const prompt = require('prompt-sync')();
// const mongoose = require("mongoose");
// const Customer = require("./models/customer.js");

// //
// dotenv.config();

// const username = prompt("What is your name? ");
// console.clear(username);

// //Connect Mongoose in Application to MongoDB (Inovke this Async Function to perform the requested action from user)
// const connectCreate = async (customerName, customerAge) => { //NOTE: We need to inlude the parameters in ALL the fuctions we are using or invoking
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");
//     await createCustomer(customerName, customerAge); //Async Operation we want to run on database (ENSURE to include the parameters that hold the input value from prompt() )
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
// }

// const connectViewAll = async () => { 
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");
//     await viewAllCustomers();
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
// }

// const connectDelete = async (customerId) => {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");
//     await viewAllCustomers();
//     await deleteCustomer(customerId);
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
// }

// //CRUD Actions
//     //Create Customer
// const createCustomer = async (customerName, customerAge) => {
//     const customerData = {
//         name: customerName,
//         age: customerAge,
//     }
//     const customer = await Customer.create(customerData);
//     console.log("You have created:", customer);
// }

//     //View ALL Customers
// const viewAllCustomers = async () => {
//     const customersArray = await Customer.find();
//     console.log("List of Total Customers:", customersArray);
// }

//     //Delete Customer
// const deleteCustomer = async (customerId) => {
//     const id = customerId;
//     const deletedCustomer = await Customer.findByIdAndDelete(id);
//     console.log(`You have deleted:`, deletedCustomer);
// }

// //Start Application
//     //Welcome Message
// const welcomeMessage = `Welcome ${username}, to the CRM`;
// console.log(welcomeMessage);
//     //Menu System Interface
// const menuSystem = `What would you like to do?

// 1. Create a Customer
// 2. View all Customers
// 3. Update a Customer
// 4. Delete a Customer
// 5. Quit`;
// const userInput = `Please type number of action to run:`;

// let userReply;
// function menuSystemUI() {
//     console.log(menuSystem);
//     userReply = prompt(`${userInput} `);
//     return userReply
// }
// menuSystemUI();

// //Create Customer Logic
// if(parseInt(userReply) === 1){ //Input from prompt()-sync is a string, so convert to number data type with parseInt() to satisfy our condition
//     const customerName = prompt(`Please provide a name: `);
//     const customerAge = prompt(`Please provide the age: `);
//     connectCreate(customerName, customerAge);
// //View All Logic
// }else if(parseInt(userReply) === 2){
//     connectViewAll();
// //Delete Customer Logic
// }else if(parseInt(userReply) === 4){
//     console.log(`Please type the ID of customer you'd like to delete`);
//     const customerId = prompt(`Customer ID: `);
//     connectDelete(customerId);
// }


//-------------------- Second Attempt with Switch Statement + Broke Down Functions for each CRUD Operation and to connect and disconnect to the MongoDB Database (mongoose.connect + mongoose.disconnect) ------------------------------\\

//Import
const dotenv = require("dotenv");
const prompt = require('prompt-sync')();
const mongoose = require("mongoose");
const Customer = require("./models/customer.js");

dotenv.config();

//Inital Prompt at Applicaiton Start
const username = prompt("What is your name? ");
console.clear();

//-------------------- Async Functions --------------------\\
    //Initially, I tried to create one async function that had connectDB, disconnectDB, and their respective data management request (create, read, update, delete) - But I had issues keeping the application running with just if...else if statements and more complications with updating and deleting users --> Remembered to try to break down large code expressions into smaller functions (which proved to be useful here), so I separated all of them and went from if...else if conditional logic to a switch statement (learned to put curly braces after case if we are coding mulitple expressions)
// Connect to MongoDB
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
};

// Disconnect from MongoDB
const disconnectDB = async () => {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
};

// CRUD Actions
    // Create Customer
const createCustomer = async (customerName, customerAge) => {
    const customerData = {
        name: customerName,
        age: customerAge,
    };
    const customer = await Customer.create(customerData);
    console.log("You have created:", customer);
};

    // View All Customers
const viewAllCustomers = async () => {
    const customersArray = await Customer.find();
    console.log("List of Total Customers:", customersArray);
};

    // Delete Customer
const deleteCustomer = async (customerId) => {
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    console.log(`You have deleted:`, deletedCustomer);
};

    //Update Customer
const updateCustomer = async (customerUpdateId, newName, newAge) => {
    const customerToUpdate = await Customer.findById(customerUpdateId);
    customerToUpdate.name = newName;
    customerToUpdate.age = newAge;
    await customerToUpdate.save();
    console.log(`You have updated:`, customerToUpdate);
}


// Menu System Interface
const menuSystem = `
What would you like to do?
1. Create a Customer
2. View all Customers
3. Update a Customer
4. Delete a Customer
5. Clear Console
6. Exit`;

const userInput = `Please type number of action to run: `;

//User Interface - Starting point for user to interact with database
function menuSystemUI() {
    console.log(menuSystem);
    return prompt(userInput);
}

// Start Application
const startApp = async () => {
    console.log(`Welcome ${username}, to the CRM`);
    let userReply;

    //I have used while loops before, but not do...while - I couldn't get my if...else if statements to work with the UPDATE and DELETE CRUD operations, nor keep the application running after each action --> I asked Chat GPT "what am I doing wrong with my if...else if statements that is not looping after each action on the database completes?" --> Response was that I didn't have any condition nor loop set up within an async function to keep looping after one action on the database was made (or errors), so it recommended using a do...while loop
    do {
        userReply = parseInt(menuSystemUI()); //Using parseInt because the input from the user will return as a string - If it's anything other than the cases below, it will resolve to the "default", but if it is one of the case numbers --> It needs to be converted to a number data type

        switch (userReply) {
            case 1: {
                try {
                    const customerName = prompt(`Please provide a name: `);
                    const customerAge = prompt(`Please provide the age: `);
                    await connectDB();
                    await createCustomer(customerName, customerAge);
                    await disconnectDB();
                } catch(error) {
                    console.clear();
                    console.log("Invalid Inputs, please provide a name and a number value for age");
                }    
                break;
            }
            case 2: {
                try {
                    await connectDB();
                    await viewAllCustomers();
                    await disconnectDB();
                } catch(error) {
                    console.clear();
                    console.log("Error, try again");
                }
                break;
            }
            case 3: {
                try {
                    await connectDB();
                    console.log("Below is a list of customers:");
                    await viewAllCustomers(); //The user needs to see the array of customers in the database to be able to make a selection
                    const customerUpdateId = prompt(`Copy and paste customer id: `);
                    const newCustomerName = prompt(`What is customer's new name?: `);
                    const newCustomerAge = prompt(`What is customer's new age?: `);
                    await updateCustomer(customerUpdateId, newCustomerName, newCustomerAge); //Stored all the prompt values in variables and passed those as arguments in the corresponding function (I was stuck here for a while and it was because I did not put the parameters when defining the function - REMEMBER: Put the parameters in the correct order when defining the function because the ORDER MATTERS)
                } catch (error) {
                    console.clear();
                    console.log("Invalid Inputs, please provide customer id without the quotes - proper name - and a number value for age");
                }
                break;
            }
            case 4: {
                try {
                    await connectDB();
                    await viewAllCustomers();
                    console.log(`Please type the ID of customer you'd like to delete`);
                    const customerId = prompt(`Customer ID: `);
                    await deleteCustomer(customerId);
                    await disconnectDB();
                } catch (error) {
                    console.clear();
                    console.log("Invalid Inputs, please provide correct customer id (without the quotes) - HINT: copy and paste");
                }
                break;
            }
            case 5:
                console.clear();
                break;
            case 6:
                console.clear();
                console.log("Exiting...");
                break;
            default:
                console.clear(); 
                console.log("Invalid input. Please try again.");
        }
    } while (userReply !== 6); // Our loop condition to ensure that the code in the do{} code block is executed first and as long as it is NOT 5, it will continue to loop (This will keep prompting the user to interact with our application until they exit with condition of userReply === 5)
};

startApp().catch(errorMessage);

function errorMessage(){
    console.error(error.message); //I didn't want the entire error console log and just the message, so researched how to do it and I couldn't simply do my initial attempt of "catch(console.error.message) because error was not an object, it was a function - so needed to create a function to use the error object
}











