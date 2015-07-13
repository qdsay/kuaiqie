(function($) {
    // 插件的定义    
    $.fn.ruler = function(options) {
        //debug(this);
        var opts = $.extend({}, $.fn.ruler.defaults, options);
        return this.each(function() {
            $this = $(this);
            var closeCrop = $('<em class="closeCrop"></em>');
            var cropHandler = $('<div class="cropHandler"><span>Top:<em id="cropTop"></em></span><span>Left:<em id="cropLeft"></em></span><span>Width:<em id="cropWidth"></em></span><span>Height:<em id="cropHeight"></em></span></div>');

            $(".ruler-wrapper").remove();
            $(this).wrap('<div class="ruler-wrapper"></div>');
            $(".ruler-wrapper").append(closeCrop);
            $(".ruler-wrapper").append(cropHandler);

            var right = $(window).width() - 500;
            var JcorpApi = $.Jcrop($this, {
                onChange: function(c) {
                    showCoords(c);
                    var top = opts.paddingTop + c.y - 30;
                    var left = opts.paddingLeft + c.x;
                    if (left > right) {
                        left = right;
                    }
                    $(".cropHandler").css({
                        "top": top,
                        "left": left
                    }).show();
                },
                onSelect: function(c) {
                    showCoords(c);
                    $(".cropHandler").show();
                },
                onRelease: function() {
                    $(".cropHandler").hide();
                }
            });
            closeCrop.on("click", function(e) {
                JcorpApi.destroy();
                doCancel(opts, e);
            });

            if (opts.setup) {
                var setup = $('<a id="set-wrapper-width" href="javascript:void(0)">设置</a>');
                cropHandler.append(setup);
                setup.bind("click", function(e) {
                    $("#wrapper-width").val($('#cropWidth').text());
                    $("#setup").parent().addClass("on");
                    JcorpApi.destroy();
                    doCancel(opts, e);
                });
            } else if (!isIE()) {
                cropHandler.append('<a id="downImage" download="banner.png" href="javascript:void(0)">导出</a>');
            }
            $(".ruler-wrapper").css({
                "width": opts.width,
                "height": opts.height,
                "padding-left": opts.paddingLeft,
                "padding-top": opts.paddingTop,
                "padding-right": $(document).width() - opts.paddingLeft - opts.width,
                "padding-bottom": $(document).height() - opts.paddingTop - opts.height - 45
            }).animate({
                filter: "alpha(opacity=100)",
                opacity: "1"
            }, "fast");
            $(".ruler-wrapper").on("dblclick", function(e) {
                if (e.target == this) {
                    JcorpApi.destroy();
                    doCancel(opts, e);
                }
            });
            $("#downImage").on("click", function() {
                var outCanvas = document.getElementById('outCanvas');
                var outctx = outCanvas.getContext('2d');
                var width = $('#cropWidth').text();
                var height = $('#cropHeight').text();
                var imageData = outctx.getImageData($('#cropLeft').text(), $('#cropTop').text(), width, height);
                var tmpCanvas = document.createElement('canvas');
                if (width != tmpCanvas.width) tmpCanvas.width = width;
                if (height != tmpCanvas.height) tmpCanvas.height = height;
                var tmpctx = tmpCanvas.getContext('2d');
                tmpctx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
                tmpctx.putImageData(imageData, 0, 0);
                $(this).attr("href", tmpCanvas.toDataURL("image/png"));
            })
        });
    };
    //测量

    function showCoords(c) {
        $('#cropLeft').text(c.x);
        $('#cropTop').text(c.y);
        $('#cropWidth').text(c.w);
        $('#cropHeight').text(c.h);
    };

    function doCancel(opts, e) {
        stopBubble(e);
        $(".ruler-wrapper").remove();
        return opts.cancel();
    }
    // 私有函数：debugging    

    function debug($obj) {
        if (window.console && window.console.log) window.console.log('ruler selection count: ' + $obj.size());
    };
    // 插件的defaults
    $.fn.ruler.defaults = {
        width: 0,
        height: 0,
        paddingTop: 0,
        paddingLeft: 0,
        setup: false,
        cancel: function() {
            $("#outCanvas").remove();
        }
    };
})(jQuery);