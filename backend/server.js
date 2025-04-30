const express = require('express'); // Import Express module
const cors = require('cors');
const apiRoutes = require('./config/apiRoutes'); // Import API Routes configuration
require('./config/mongoose'); // Import Mongoose module
require('dotenv').config();

const cookieParser = require('cookie-parser');

const app = express(); // Define express app
app.use(cookieParser());
app.use(cors({}));

app.use('/public', express.static('public')); // Accept express to use public folder for the static frontend part
app.set('view engine', 'ejs'); // Set ejs as a view engine
app.use(express.urlencoded({ extended: true })); //Accept JSON in the request
app.use(express.json()); // Accept express to use JSON in the response

// Use API routes defined in config/apiRoutes.js
app.use('/api', apiRoutes);

// Start the server
const PORT = 2100;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
