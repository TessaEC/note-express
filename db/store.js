const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Save {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }
  
//get notes from read function
  getNotes() {
    return this.read().then((notes) => {
      let jsonNotes;
      try {
        jsonNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        jsonNotes = [];
      }
      return jsonNotes;
    });
  }

  noteAdded() {

    // create a unique id
    const newNote = { title, text, id: uuidv1() };
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((noteUpdate) => this.write(noteUpdate))
      .then(() => newNote);
  }

  noteRemoved(id) {
    // deletes note with given id
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filterNotes) => this.write(filterNotes));
  }
}

module.exports = new Store();