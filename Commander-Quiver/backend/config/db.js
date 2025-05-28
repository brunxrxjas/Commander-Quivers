'use strict';
const Mongoose = require('mongoose');

const uri = process.env.DB_URI ||
"mongodb+srv://brunxrxjas:_HN6PP%40Y8SEqEgQ@cluster0.amwixc9.mongodb.net/";

Mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch(error => console.log('MongoDB Error:'
    +error.message));

    const db = Mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    exports.Mongoose = Mongoose;