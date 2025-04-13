const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const dbUrl = process.env.mongodbUrl;
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Failed to connect to the database:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
