const api = require('express').Router();
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require("fs");

const filePath = path.join(__dirname, "../db/db.json")

// GET route to read the `db.json` file and return all saved notes as JSON.
api.get("/notes", (req, res) => {
    res.sendFile(filePath);
});

// POST route for a new note
api.post("/notes", (req, res) => {
    const {title, text} = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4(),
    };

    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);

            parsedData.push(newNote);

            fs.writeFile(filePath, JSON.stringify(parsedData, null, 4), (err) =>
                err ? console.error(err) : console.info(`\nData written to db.json`)
            );

            res.json(`\nNote added successfully`);
        }
    });
});

// DELETE route for deleting a note from the app/db
api.delete("/notes/:id", (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            let newParsed = parsedData.filter((note) => {
                return note.id != req.params.id; 1;
            });
            fs.writeFile(filePath, JSON.stringify(newParsed, null, 4), (err) =>
                err ? console.error(err) : console.info(`\nData deleted from db.json`)
            );
            res.json(`Note deleted successfully`);
        }
    });
});

module.exports = api;
