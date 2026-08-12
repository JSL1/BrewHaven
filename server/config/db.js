require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB Atlas successfully');
});

module.exports = db;