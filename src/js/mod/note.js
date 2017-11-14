require('less/note.less')

var Toast = require('./toast.js').Toast
var Event = require('mod/event.js')
var NoteManager = require('mod/note-manager.js')

// {id, text}，移动，添加，删除
function Note(opts) {
    this.opts = opts

}
Note.prototype = {
    
}

module.exports.Note = Note