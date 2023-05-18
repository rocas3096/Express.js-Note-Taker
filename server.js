// Importing required modules
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Importing route handlers
const notes = require('./routes/notes');
const index = require('./routes/index');

// Defining the port number
const PORT = process.env.PORT || 3001;

// Creating an Express application
const app = express();

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Mounting the API routes
app.use('/api', api);

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Route handler for the root URL
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Route handler for the '/notes' URL
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Mounting the notes and index routes
app.use('/api/notes', notes);
app.use('/api', index);

// Starting the server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);