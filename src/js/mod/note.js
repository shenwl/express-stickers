require('less/note.less')

var Toast = require('./toast.js').Toast
var Event = require('mod/event.js')
var NoteManager = require('mod/note-manager.js')

function Note(opts) {
    this.initOpts(opts)
    this.createNote()
    this.setLayout()
    this.bindEvent()
}
Note.prototype = {
    //设置不同的noteHead，noteCt颜色
    colors:{},
    defaultOpts: {
        id: '',
        $ct: $('#wall').length>0?$('#wall'):$('body'),
        context: '在此输入'
    },
    initOpts: function(opts) {
        this.opts = $.extend({}, this.defaultOpts, opts || {})
        if(this.opts.id) {
            this.id = this.opts.id
        }
    },
    createNote: function() {
        var tpl = '<div class="note">' +
                    '<div class="note-header">' +
                        '<span class="delete-note">X</span>'
                    '</div>' +
                    '<div class="note-ct" contentEditable="true">' + 
                    '</div>' + 
                  '</div>'
        this.$note = $(tpl)
        this.$note.find('.note-ct').html(this.opts.context)
        this.opts.$ct.append(this.$node)
        if(!this.id) {
            this.$note.css('bottom', '10px')
        }
    },
    setStyle: function() {
  
    },
    setLayout: function() {
        var self = this
        if(self.clk) {
            clearTimeout(self.clk)
        }
        self.clk = setTimeout(function() {
            Event.fire('waterfall')
        }, 100)
    },
    bindEvent: function() {
        var self = this
        $note = this.$note
        $noteHead = $note.find('.note-head')
        $noteCt = $note.find('.note-ct')
        $deleteBtn = $note.find('.delete-note')

        $deleteBtn.on('click', function() {
            self.delete()
        })
        //contenteditable没有change事件，只能模拟判断元素内容变动，执行save
        $noteCt.on('focus', function() {
            if($noteCt.html() == '在此输入') {
                $noteCt.html('')
            }
            $noteCt.data('before', $noteCt.html())
        }).on('blur paste', function() {
            if($noteCt.data('before') != $noteCt.html()) {
                $noteCt.data('before', $noteCt.html())
                self.setLayout()
                if(self.id) {
                    self.edit($noteCt.html())
                }else {
                    self.add($noteCt.html())
                }
            }
        })

        //设置note移动
        $noteHead.on('mousedown', function(e) {
            var evtX = e.pageX - $note.offset().left
            var evtY = e.pageY - $note.offset().top
            $note.addClass('draggable').data('evtPos', {x: evtX, y: evtY})
        }).on('mouseup', function() {
            $note.removeClass('draggable').removeData('pos')
        })

        $('body').on('mousemove', function(e) {
            $('.draggable').length &&  $('.draggable').offset({
                top: e.pageY-$('.draggable').data('evtPos').y,
                left: e.pageX-$('.draggable').data('evtPos').x
            })
        })      
    },
    edit: function(msg) {
        var self = this
        $.post('/api/notes/edit', {
            id: self.id,
            note: msg
        }).done(function(result) {
            if(result.status === 0) {
                console.log('update success')
            }else {
                console.log(result.errorMsg)
            }
        }) 
    },
    add: function(msg) {
        console.log('add...')
        var self = this
        $.post('/api/notes/add', {
            note: msg
        }).done(function(result) {
            if(result.status === 0) {
                self.id = result.data.id
                Toast('add success')
            }else {
                Toast(result.errorMsg)
            }
        })
    },
    delete: function() {
        var self = this
        $.post('/api/notes/delete', {
            id: this.id
        }).done(function(result) {
            if(result.status === 0) {
                Toast('delete success')
                self.$note.remove()
                Event.fire('waterfall')
            }else {
                Toast(result.errorMsg)
            }
        })
    }  
}

module.exports.Note = Note