const express = require('express');

// Importing the notes router
const notes = require('./notes');

// Creating an Express application
const app = express();

// Mounting the notes router under the '/api/notes' path
app.use('/api/notes', notes);

// Exporting the Express application
module.exports = app;