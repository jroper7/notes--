const textArea = document.getElementById('textArea');

let noteId;


//Data is the note object received from the main process
window.ElectronAPI.onNoteId(data => {
    //Update the id with the data received from the main process
    noteID = data;
    console.log('Received note ID:', noteId);

    textArea.value = data.content || '';
});

//Listen for input events on the text area
textArea.addEventListener('input', () => {
    //Save the content of the text area to localStorage with the noteId as the key
    window.localStorage.setItem(noteId, textArea.value);
    console.log('Note content saved:', textArea.value);
});

// Add event listeners for buttons
// These buttons are used to add a new note or close the application
document.getElementById('add').onclick = () => window.electronAPI.addNewNote();
document.getElementById('close').onclick = () => window.close();


