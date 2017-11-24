require('less/index.less')

var NoteManager = require('mod/note-manager.js')
var WaterFall = require('mod/waterfall.js').WaterFall
var Toast = require('mod/toast.js').Toast
var Event = require('mod/event.js')
var Note = require('mod/note.js').Note
var GoTop = require('mod/gotop.js').GoTop

NoteManager.load()
$('#add-note').on('click', function() {
   NoteManager.add()
})

Event.on('waterfall', function() {
    new WaterFall($('.note-wall'))
})

var btn = new GoTop($('<div class="gotop"></div>'))
