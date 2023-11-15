const express = require('express');
const connectDB = require('./config/connection');
const routes = require('./routes'); // Make sure your routes are correctly set up in the 'routes' directory

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Using routes
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

