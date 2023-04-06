const path = require('path');
const fs = require('fs');
const {v4:uuidv4} = require('uuid');
const apiRoutes = require('express').Router();

// GET returns all notes
apiRoutes.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// posts new note
apiRoutes.post('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data);
    notes.push({...req.body, id: uuidv4()});
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        throw err;
      }
      res.json(req.body);
    });
  });
});

// deletes note with given id
apiRoutes.delete('/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err) {
      throw err;
    }
    const notes = JSON.parse(data);
    const newNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
      if (err) {
        throw err;
      }
      res.json(newNotes);
    });
  });
});


module.exports = apiRoutes;