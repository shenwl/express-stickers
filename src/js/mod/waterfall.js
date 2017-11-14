function WaterFall($ct) {
    this.$ct = $ct
    this.$nodes = $ct.children()

    this.init()
}
WaterFall.prototype.init = function() {
    var self = this
    this.render()
    $(window).on('resize', function() {
        self.render()
    })
}
WaterFall.prototype.render = function() {
    var _this = this
    this.colSumHeight = []
    this.ctWidth = this.$ct.width()
    this.nodeWidth = this.$nodes.outerWidth(true)

    for(let i = 0; i < parseInt(this.ctWidth / this.nodeWidth); i++) {
        this.colSumHeight.push(0)
    }
    this.$nodes.each(function() {
        _this.putNode($(this))
    })
}
WaterFall.prototype.putNode = function($node) {
    var minItem = Math.min.apply(null, this.colSumHeight)
    var minIndex = this.colSumHeight.indexOf(minItem)
    $node.css({
        top: minItem,
        left: this.nodeWidth * minIndex
    })
    this.colSumHeight[minIndex] += $node.outerHeight(true)
}

module.exports.WaterFall = WaterFall