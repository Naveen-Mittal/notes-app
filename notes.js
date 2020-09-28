const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {    
    return 'your notes';
};

const addNote = function(title, body) {
    const notes = loadNotes();
    for (let i = 0; i < notes.length; i++) {
        if(notes[i].title === title) {
            console.log(chalk.red.inverse('title has been taken'));
            return
        }
    }
    // const duplicates = notes.filter(note => note.title === title)
    // const duplicate = notes.find(note => note.title === title)
    //if(!duplicate) {
    //         notes.push({
    //         title: title,
    //         body: body
    //}

    // if (duplicates.length === 0) {
    //         notes.push({
    //         title: title,
    //         body: body
    //     })
    //     console.log(chalk.green.inverse('new note added!'));
    // } else {
    //     console.log(`${chalk.red.inverse(`note title taken!`)}`);
    // }
        
    notes.push({
    title: title,
    body: body
})
    console.log(chalk.green.inverse('new note added!'));
    saveNotes(notes);

};

const removeNote = title => {
    const notes = loadNotes();
    const newNotes = notes.filter(el => el.title !== title);

    if(notes.length > newNotes.length) {
        console.log(chalk.green.inverse('Note Remove!'));
        saveNotes(newNotes);
    } else {
        console.log(chalk.red.inverse('No Note found!'));
    }
}    

const listNotes = () => {
    console.log(chalk.black.bgWhite.bold('Your Notes'))
    const notes = loadNotes();
    notes.forEach((note, i) => {
        console.log(`${i+1}. ${chalk.bold.green(note.title)}`);
    });
    //console.log(notes);
}

const readNote = title => {
    const notes = loadNotes();
    const displayNote = notes.find(note => note.title === title);
    if(displayNote) {
        console.log(`${chalk.bold.green(displayNote.title)}`);
        console.log(`${chalk.blueBright(displayNote.body)}`);
    } else {
        console.log(chalk.red.inverse('No Note Found'))
    }
}


    


const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};