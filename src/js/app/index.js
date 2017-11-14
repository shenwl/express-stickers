require('less/index.less')

var NoteManager = require('mod/note-manager.js')
var WaterFall = require('mod/waterfall.js').WaterFall
var Toast = require('mod/toast.js').Toast
var Event = require('mod/event.js')

NoteManager.load()

$('.add-note').on('click', function() {
   NoteManager.add()
})

Event.on('waterfall', function() {
    new WaterFall($('#content'))
})

Toast('helloworld')