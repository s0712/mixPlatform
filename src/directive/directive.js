import Vue from 'vue';



//滚动加载
Vue.directive('scroll', {
    inserted: function(el, binding) {
        var box = $(el).find('.el-table__body-wrapper');
        var table = box.find('table');
        function realFunc() {
            var sl=box[0].scrollLeft;
            var st=box[0].scrollTop;
            var d=$(box).data('slt')||0;
            if (st!==d.st) {
                if (box.scrollTop() + box.height() >= table.height() * .9) {
                    binding.value();
                }
            }
            $(box).data('slt',{sl:sl,st:st});
        }
        box.scroll(_.throttle(realFunc, 750));
    }
});

