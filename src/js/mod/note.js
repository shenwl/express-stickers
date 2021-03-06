require('less/note.less')

var Toast = require('./toast.js').Toast
var Event = require('mod/event.js')

function Note(opts) {
    this.initOpts(opts)
    this.createNote()
    this.bindEvent()
    this.setLayout()
 
}
Note.prototype = {
    defaultOpts: {
        id: '',
        $ct: $('.note-wall').length>0?$('.note-wall'):$('body'),
        context: '在此输入'
    },
    initOpts: function(opts) {
        var self = this
        this.opts = $.extend({}, self.defaultOpts, opts || {})
        if(this.opts.id) {
            self.id = self.opts.id
        }
    },
    createNote: function() {
        var tpl = '<div class="note">' +
                    '<div class="note-head">' +
                        '<span class="delete-note">x</span>' +
                    '</div>' +
                    '<div class="note-ct" contentEditable="true"></div>' + 
                  '</div>'

        this.$note = $(tpl)
        this.$note.find('.note-ct').html(this.opts.context)
        this.opts.$ct.append(this.$note)
        if(!this.id) {
            this.$note.css('top', '10px')
        }
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
            if($(this).html() == '在此输入') {
                $(this).html('')
            }
            $(this).data('before', $(this).html())
        }).on('blur paste', function() {
            if($(this).data('before') != $(this).html()) {
                $(this).data('before', $(this).html())
                self.setLayout()
                if(self.id) {
                    self.edit($(this).html())
                }else {
                    self.add($(this).html())
                }
            }
        })

        //设置note移动
        $noteHead.on('mousedown', function(e) {
            //bug：没有这行的话拖动永远作用在最后创建的note上
            $note = $(this).parent('.note')

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
                Toast('编辑成功')
            }else {
                console.log(result.errorMsg)
            }
        }) 
    },
    add: function(msg) {
        var self = this
        $.post('/api/notes/add', {
            note: msg
        }).done(function(result) {
            if(result.status === 0) {
                self.id = result.data.id
                Toast('添加成功')
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
                Toast('删除成功')
                self.$note.remove()
                Event.fire('waterfall')
            }else {
                Toast(result.errorMsg)
            }
        })
    }  
}

module.exports.Note = Note