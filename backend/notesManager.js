const fs = require('fs');
const { get } = require('http');
const path = require('path');
// This will not be good in the future because it for one uses a relative path
// and it's not good practice because it assumes the notes directory is in the same directory as this file.
//This would also give me a problem because the json would come out in a long one lined object

// const notesFilePath = path.join(__dirname, 'notes/notes.json');

//Proper way to write this 
//This takes the current directory of this file and goes up one level to the parent directory
// and then takes all notes from the notes directory
const notesFilePath = path.join(__dirname, '..', 'notes')
const metaFile = path.join(notesFilePath, 'meta.json');

function doesNotesFileExist() {
    if (!fs.existsSync(notesFilePath)) {
        fs.mkdirSync(notesFilePath);
    }

    if (!fs.existsSync(metaFile)) {
        // Create a meta file if it doesn't exist
        // This file will be used to store metadata about the notes, such as a note counter
        // The 2 in the second parameter of JSON.stringify is used to format the JSON with indentation
        fs.writeFileSync(metaFile, JSON.stringify({ noteCounter:0 }, null, 2));
    }
}

function getNextNoteId() {
    // Read the meta file to get the current note counter
    const metaData = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));
    
    // Increment the note counter and save it back to the meta file
    metaData.noteCounter += 1;
    fs.writeFileSync(metaFile, JSON.stringify(metaData, null, 2));
    
    return `note-${metaData.noteCounter}`;
}


function createNote() {
    //Check if the notes directory exists, if not create it
    doesNotesFileExist();
    const id = getNextNoteId();
    const notePath = path.join(notesFilePath, `${id}.json`);

    const current = new Data().toISOString();

    const noteData = {
        id,
        content: '',
        createdAt: current,
        updatedAt: current,
        x:150,
        y:150,
        width:300,
        height:300
    };

    fs.writeFileSync(notePath, JSON.stringify(noteData, null, 2));
    return noteData;

}