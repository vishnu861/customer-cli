const mongoose = require('mongoose');

// connect to db
// map global promise -> get rid of warning;
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/customercli',{ useNewUrlParser: true, useUnifiedTopology: true });


const Customer = require('./models/customer.js');

// Add customer 
const addCustomer = (customer) =>{
    Customer.create(customer).then(
        customer => {
            console.info("New Customer added");
            mongoose.connection.close()
        }
    ).catch((err) => {
        console.log(err);
    })
}



// find customer 

const findCustomer = (name) => {
    // make case insensitive
    const search = new RegExp(name,'i');
    Customer.find({$or:[{firstname:search}, {lastname:search}]}).then(
        customer => {
            console.info(customer);
            console.log(`${customer.length} matches`);
            mongoose.connection.close()
        }
    ).catch((err)=>{
        console.log(err);
    })
}

// update customer 

const updateCustomer = (_id,customer) => {
    Customer.updateOne({_id},customer).then((customer) =>{
        console.info('Customer Updated');
        mongoose.connection.close();
    }).catch((err) => {
        console.log(err);
    })
}   

// remove customer 

const removeCustomer = (_id) => {
    Customer.deleteOne({_id}).then(() =>{
        console.info('Customer removed');
        mongoose.connection.close();
    }).catch((err) => {
        console.log(err);
    })
}   

// list all customers 

const listCustomers = () =>{
    Customer.find().then((customers) => {
        console.info(customers);
        console.info(`${customers.length} customers`);
        mongoose.connection.close();
    }).catch((err) => {
        console.log(err);
    })
}


module.exports = {addCustomer,findCustomer,updateCustomer,removeCustomer,listCustomers};


