var Toast = require('./toast.js').Toast
var Note = require('./note.js').Note
var Event = require('mod/event.js')

//load data, add stickers两个方法
var NoteManager = (function() {
    function load() {
        $.get('/api/notes')
            .done(function(result){
                if(result.status === 0){
                    $.each(result.data, function(idx, article) {
                        new Note({
                            id: article.id,
                            context: article.text
                        })
                    })
                    Event.fire('waterfall')
                }else{
                    Toast(result.errorMsg)
                }
            })
            .fail(function() {
                Toast('网络异常')
            })       
    }

    function add() {
        new Note()
    }
    
    return {
        load: load,
        add: add
    }
})()

module.exports = NoteManager