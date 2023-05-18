const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// Route to get all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received to retrieve notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Route to add a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.status(500).json({ error: 'Error in adding Note' });
    }
});

const fs = require('fs');

// Route to delete a note
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);

    const noteId = req.params.id;

    readFromFile('./db/db.json')
        .then((data) => {
            let notes = JSON.parse(data);
            const filteredNotes = notes.filter((note) => note.id !== noteId);

            if (notes.length !== filteredNotes.length) {
                fs.writeFile('./db/db.json', JSON.stringify(filteredNotes, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Error deleting note' });
                    } else {
                        res.json('Note deleted successfully');
                    }
                });
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Error reading notes' });
        });
});

module.exports = notes;