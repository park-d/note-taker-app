const api = require('express').Router();
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require("fs");

const filePath = path.join(__dirname, "../db/db.json")

// route to read the `db.json` file and return all saved notes as JSON.
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

module.exports = api;
