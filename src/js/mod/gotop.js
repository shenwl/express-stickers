require('less/gotop.less')

function GoTop($ct) {
    this.ct = $ct
    this.target = $('<a class="btn">GoTop</a>')
    this.createNode()
    this.bindEvent()
}
GoTop.prototype.bindEvent = function () {
    var ct = this.ct
    var target = this.target
    $(window).on('scroll', function () {
        if ($(window).scrollTop() === 0) {
            ct.css({
                opacity: 0
            })
        } else {
            setTimeout(function () {
                //如果滚到顶部，不会出现
                if($(window).scrollTop() === 0) return
                ct.css({
                    opacity: 1
                })
            }, 300)
        }
    })


    this.target.on('click', function (e) {
        e.preventDefault()
        $(window).scrollTop(0)
        ct.css({
            opacity: 0
        })
    })
}
GoTop.prototype.createNode = function () {
    this.ct.append(this.target)
    $('body').append(this.ct)
}

module.exports.GoTop = GoTop