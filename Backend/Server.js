const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const routes = require('./routes/routes.js');
app.use('/api/v1', routes);

mongoose
    .connect(process.env.mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));