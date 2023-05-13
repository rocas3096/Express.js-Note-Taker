const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const notes = require('./routes/notes');
const index = require('./routes/index');


const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.use('/api/notes', notes);
app.use('/api', index);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);