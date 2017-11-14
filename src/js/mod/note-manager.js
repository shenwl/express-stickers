var Toast = require('./toast.js').Toast
var Note = require('./note.js').Note
var Event = require('mod/event.js')

//load data, add stickers两个方法
var NoteManager = (function() {


    

    return {
        load: load,
        add: add
    }
})()