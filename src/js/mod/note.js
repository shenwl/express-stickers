require('less/note.less')

var Toast = require('./toast.js').Toast
var Event = require('mod/event.js')
var NoteManager = require('mod/note-manager.js')

// {id, text}，移动，添加，删除
function Note(opts) {
    this.initOpts(opts)
    this.createNote()
    this.setStyle()
    this.bindEvent()
}
Note.prototype = {
    defaultOpts: {
        id: '',
        $ct: $('#wall'),
        context: '在此输入'
    },
    initOpts: function(opts) {
        this.opts = $.extend({}, this.defaultOpts, opts||{})
        if(this.opts.id) {
            this.id = this.opts.id
        }
    },
    createNote: function() {
        var tpl = '<div class="note">' +
                    '<div class="note-header"></div>' +
                    '<div class="note-ct" contentEditable="true">' + 
                    '</div>' + 
                  '</div>'
        this.$node = $(tpl)
        this.$node.find('.note-ct').html(this.opts.context)
        this.opts.$ct.append(this.$node)
        if(!this.id) {
            this.$node.css('bottom', '10px')
        }
    },
    setStyle: function() {

    },
    setLayout: function() {
        Event.fire('waterfall')

    },
    bindEvent: function() {
        var self = this
        $('#add-note').on('click', function() {
            NoteManager.add()
            console.log('add note...')
        })
        
    },
    edit: function() {
        
    },
    add: function(msg) {

    },
    delete: function() {

    }
    
}

module.exports.Note = Note