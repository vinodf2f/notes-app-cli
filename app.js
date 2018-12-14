const fs = require('fs');
const notes = require('./notes.js')
const _ = require('lodash');
const yargs = require('yargs');

let titleOptions = {
    describe: 'Title Of Note',
    demand: true,
    alias: 't'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: {
            describe: 'Body of Note',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List All Note')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
debugger;
var command = process.argv[2];

if (command === 'add') {

    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    }
    else { console.log('NOte Title Taken'); }
}


else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note)
    );
}


else if (command === 'read') {
    let note = notes.getNote(argv.title);

    if (note) {
        console.log('Note Found');
        notes.logNote(note);
    }
    else { console.log('NOte not found'); }
}


else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}


else { console.log('Command not recongnized'); }