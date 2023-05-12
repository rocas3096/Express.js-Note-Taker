const express = require('express');

const notes = require('./notes');

const app = express();

app.use('/api/notes', notes);

module.exports = app;