function getBody(template) {
    var html = '';
    if ($(".outer-section").length > 0) {
        if (template == "simplify") {
            html += getSimplify();
        } else {
            html += getStandard();
        }
    } else {
        html += '\r\n';
    }
    return html;
}

function getStandard() {
    var html = '';
    if ($(".outer-section").length > 0) {
        var counter = 0;
        $(".outer-section").each(function(i) {
            counter = i + 1;
            var split = "";
            if ($(this).hasClass("isplit") && sectionMarginBottom > 0) {
                split = " split";
            }
            var wrapper = $(this).children(".outer-wrapper");
            if ($(this).hasClass("section-bg-color") || wrapper.hasClass("outer-banner") || wrapper.find(".split-columns").length > 0) {
                html += '<section id="outer-section-' + counter + '" class="outer-section' + split + '">\r\n';
            } else {
                html += '<section class="outer-section' + split + '">\r\n';
            }

            var perch = '';
            if (wrapper.hasClass("outer-banner")) {
                perch = '  ';
                html += perch + '<div class="outer-banner">\r\n';
            }
            html += perch + '  <div class="outer-wrapper">\r\n';
            if (wrapper.find(".split-columns").length > 0) {
                html += perch + '    <div class="columns">' + '\r\n';
                wrapper.find("ul").each(function(i) {
                    html += perch + '      <ul>' + '\r\n';
                    $(this).children("li").each(function(k) {
                        html += perch + '        <li><div><a href="" title="" target="_blank"><img src="images/qd_s' + counter + '_r' + i + '_c' + k + '.png" alt="" /></a></div></li>' + '\r\n';
                    });
                    html += perch + '      </ul>' + '\r\n';
                });
                html += perch + '    </div>' + '\r\n';
            } else if (!wrapper.hasClass("ignore")) {
                var img = '<img class="banner" src="images/qd_s' + counter + '.png" alt="" />';
                var element = wrapper.children();
                if (element.length > 0) {
                    element.each(function(k) {
                        var sub = '';
                        if ($(this).is("div[ref]")) {
                            sub = '<a href="' + $(this).attr("ref") + '" target="_blank">' + img + '</a>';
                        } else if ($(this).is("a")) {
                            if (img.length > 0) {
                                $(this).html(img);
                            }
                            sub = $(this).prop("outerHTML");
                        }
                        html += perch + '    ' + sub + '\r\n';
                    });
                } else if (img.length > 0) {
                    html += perch + '    ' + img + '\r\n';
                }
            }
            html += perch + '  </div>\r\n';
            if (wrapper.hasClass("outer-banner")) {
                html += perch + '</div>\r\n';
            }
            html += '</section>\r\n';
        });
    }
    return html;
}

function getSimplify() {
    var html = '';
    var alone = false;
    if ($(".outer-section").length > 0) {
        var counter = 0;
        $(".outer-section").each(function(i) {
            counter = i + 1;
            var wrapper = $(this).children(".outer-wrapper");
            if ($(this).hasClass("section-bg-color") || wrapper.find(".split-columns").length > 0 || wrapper.hasClass("ignore")) {
                if (counter > 1) html += '</div>\r\n';
                html += '<div id="wrapper-' + counter + '" class="wrapper">\r\n';
                alone = true;
            } else if (counter == 1) {
                html += '<div class="wrapper">\r\n';
            } else if (alone) {
                html += '</div>\r\n';
                html += '<div class="wrapper">\r\n';
                alone = false;
            }
            var perch = '';
            if (wrapper.hasClass("outer-banner")) {
                perch = '  ';
                html += perch + '<div class="full-banner">\r\n';
            }
            if (wrapper.find(".split-columns").length > 0) {
                html += perch + '    <div class="columns">' + '\r\n';
                wrapper.find("ul").each(function(i) {
                    html += perch + '      <ul>' + '\r\n';
                    $(this).children("li").each(function(k) {
                        html += perch + '        <li><a href="" title="" target="_blank"><img src="images/qd_s' + counter + '_r' + i + '_c' + k + '.png" alt="" /></a></li>' + '\r\n';
                    });
                    html += perch + '      </ul>' + '\r\n';
                });
                html += perch + '    </div>' + '\r\n';
            } else {
                var split = "";
                if ($(this).hasClass("isplit") && sectionMarginBottom > 0) {
                    split = " split";
                }
                var img = '<img class="banner' + split + '" src="images/qd_s' + counter + '.png" alt="" />';

                var element = wrapper.children();
                if (element.length > 0) {
                    element.each(function(k) {
                        var sub = '';
                        if ($(this).is("div[ref]")) {
                            sub = '<a href="' + $(this).attr("ref") + '" target="_blank">' + img + '</a>';
                        } else if ($(this).is("a")) {
                            if (img.length > 0) {
                                $(this).html(img);
                            }
                            sub = $(this).prop("outerHTML");
                        }
                        html += perch + '    ' + sub + '\r\n';
                    });
                } else if (img.length > 0) {
                    html += perch + '    ' + img + '\r\n';
                }
            }
            if (wrapper.hasClass("outer-banner")) {
                html += perch + '</div>\r\n';
            }
            if (counter == $(".outer-section").length) {
                html += '</div>\r\n';
            }
        });
    }
    return html;
}

function getStyle(template) {
    var css = '';
    if ($(".outer-section").length > 0) {
        if (template == "simplify") {
            css += getSimplifyCSS();
        } else {
            css += getStandardCSS();
        }
    } else {
        css += '\r\n';
    }
    return css;
}

function getStandardCSS() {
    var css = "";
    var style = "";
    css += '* {margin: 0; padding: 0;}\r\n';
    css += 'body, textarea, input, button, select, keygen, legend{font:14px "Microsoft YaHei", Verdana, "宋体", sans-serif; font-weight: normal; color: #666666; outline: 0;}\r\n';
    css += 'header, footer, section, article, aside, nav, address, figure, figcaption, menu, details {display:block;}\r\n';
    css += 'h1, h2, h3, h4, h5, h6 {font-weight: normal;}\r\n';
    if (pageBackgroundColor[0] != 255 || pageBackgroundColor[1] != 255 || pageBackgroundColor[2] != 255) {
        css += 'body {background-color: ' + $("#body-bg-color").val() + ';}\r\n';
    }
    css += 'table {border-collapse: collapse; border-spacing: 0;}\r\n';
    css += 'caption, th {text-align:left;font-weight: normal;}\r\n';
    css += 'html, body, fieldset, img, iframe, abbr{border: 0;}\r\n';
    css += 'i, cite, em, var, address, dfn{font-style: normal;}\r\n';
    css += 'summary{outline: 0;}\r\n';
    css += 'ul, li{list-style: none;}\r\n';
    css += 'img {vertical-align: middle;}\r\n';
    css += 'a, a:hover{text-decoration: none; cursor: pointer;}\r\n';
    css += 'a:link {color: #666666;}\r\n';
    css += 'a:visited {color: #666666;}\r\n';
    css += 'a:hover {color: #C91618;}\r\n';
    css += 'a:active {color: #666666;}\r\n\r\n';
    if (sectionMarginBottom > 0) {
        style = ' margin-bottom: ' + sectionMarginBottom + 'px;';
    }
    css += '.outer-section {width:100%;' + style + ' float: left; clear: both;}\r\n';
    css += '.outer-wrapper {width:100%; max-width: ' + wrapperWidth + 'px; margin: 0 auto;}\r\n';
    if ($(".split-columns").length > 0) {
        css += '.columns {max-width: ' + wrapperWidth + 'px; margin: 0 auto;}\r\n';
    }
    css += '.banner {width:100%; max-width: ' + wrapperWidth + 'px; height: auto;}\r\n';
    if ($(".outer-banner").length > 0) {
        css += '.outer-banner {width:100%; max-width: ' + canvasWidth + 'px; margin: 0 auto; height: auto;}\r\n';
    }
    if ((".isplit").length > 0 && sectionMarginBottom > 0) {
        css += '.split {margin-bottom: 0;}\r\n';
    }
    css += '\r\n';

    if ($(".outer-section").length > 0) {
        var counter = 0;
        $(".outer-section").each(function(i) {
            counter = i + 1;
            if ($(this).hasClass("section-bg-color")) {
                css += '#outer-section-' + counter + ' {background-color: #' + rgbToHex($(this).css("background-color")) + ';}\r\n';
            }
            var wrapper = $(this).children(".outer-wrapper");
            if (wrapper.hasClass("outer-banner")) {
                css += '#outer-section-' + counter + ' .outer-banner {background: url(../images/qd_s' + counter + '_bg.png) no-repeat scroll center bottom / cover;}\r\n';
            }
            var split = wrapper.find(".split-columns");
            if (split.length > 0) {
                var ul = split.find("ul:last");
                var li = split.find("li:last");
                var marginTop = parseInt(ul.css("margin-top").slice(0, -2));
                var marginLeft = parseInt(li.css("margin-left").slice(0, -2));
                var width = 100 / ul.children("li").length;

                if (split.css("padding-top") == split.css("padding-bottom") && split.css("padding-left") == split.css("padding-right")) {
                    if (split.css("padding-top") == split.css("padding-left")) {
                        if (parseInt(split.css("padding-top").slice(0, -2)) > 0) {
                            css += '#outer-section-' + counter + ' .columns {padding: ' + split.css("padding-top") + '; overflow:hidden;}\r\n';
                        }
                    } else {
                        css += '#outer-section-' + counter + ' .columns {padding: ' + split.css("padding-top") + ' ' + split.css("padding-left") + '; overflow:hidden;}\r\n';
                    }
                } else {
                    css += '#outer-section-' + counter + ' .columns {padding: ' + split.css("padding-top") + ' ' + split.css("padding-right") + ' ' + split.css("padding-bottom") + ' ' + split.css("padding-left") + '; overflow:hidden;}\r\n';
                }

                if (marginLeft > 0) {
                    var edge = Math.floor(marginLeft / 2);
                    var bottom = (marginTop > 0) ? 'margin-bottom: ' + marginTop + 'px;' : '';
                    css += '#outer-section-' + counter + ' .columns ul {margin-left: -' + edge + 'px; margin-right: -' + edge + 'px;}\r\n';
                    css += '#outer-section-' + counter + ' .columns li {width: ' + width + '%; float: left;}\r\n';
                    css += '#outer-section-' + counter + ' .columns li div {' + bottom + 'padding: 0 ' + edge + 'px;}\r\n';
                    css += '#outer-section-' + counter + ' .columns li div img {width: 100%; height: auto;}\r\n';
                } else {
                    css += '#outer-section-' + counter + ' .columns li {width: ' + width + '%; float: left;}\r\n';
                    if (marginTop > 0) {
                        css += '#outer-section-' + counter + ' .columns li div {margin-bottom: ' + marginTop + 'px;}\r\n';
                        css += '#outer-section-' + counter + ' .columns li div img {width: 100%; height: auto;}\r\n';
                    } else {
                        css += '#outer-section-' + counter + ' .columns li img {width: 100%; height: auto;}\r\n';
                    }
                }
            }
        });
        if ($(".outer-section").find(".split-columns").length > 0) {
            css += '@media screen and (max-width : 1920px) {}\r\n';
            css += '@media screen and (max-width : 1280px) {}\r\n';
            css += '@media screen and (max-width : 1024px) {}\r\n';
            css += '@media screen and (max-width : 640px) {}\r\n';
            css += '@media screen and (max-width : 320px) {}\r\n';
        }
    }
    return css;
}

function getSimplifyCSS() {
    var css = "";
    var style = "";
    css += '* {margin: 0; padding: 0;}\r\n';
    css += 'html, body, img{border: 0;}\r\n';
    if (pageBackgroundColor[0] != 255 || pageBackgroundColor[1] != 255 || pageBackgroundColor[2] != 255) {
        css += 'body {background-color: ' + $("#body-bg-color").val() + '; outline: 0;}\r\n';
    }
    if ($(".split-columns").length > 0) {
        css += 'ul, li{list-style: none;}\r\n';
    }
    css += 'img {vertical-align: middle;}\r\n';
    css += 'a, a:hover{text-decoration: none; cursor: pointer;}\r\n\r\n';

    css += '.wrapper {width:100%; text-align: center;}\r\n';
    if ($(".split-columns").length > 0) {
        css += '.columns {width: ' + wrapperWidth + 'px; margin: 0 auto;}\r\n';
    }
    if (sectionMarginBottom > 0) {
        style = ' margin-bottom: ' + sectionMarginBottom + 'px;';
    }
    css += '.banner {width:100%; max-width: ' + wrapperWidth + 'px; height: auto; margin: 0 auto;' + style + '}\r\n\r\n';
    if ($(".outer-banner").length > 0) {
        css += '.full-banner {width:100%; max-width: ' + canvasWidth + 'px; margin: 0 auto;}\r\n';
    }
    if ((".isplit").length > 0 && sectionMarginBottom > 0) {
        css += '.split {margin-bottom: 0;}\r\n';
    }
    css += '\r\n';

    if ($(".outer-section").length > 0) {
        var counter = 0;
        $(".outer-section").each(function(i) {
            counter = i + 1;
            var wrapper = $(this).children(".outer-wrapper");
            if ($(this).hasClass("section-bg-color")) {
                css += '#wrapper-' + counter + ' {background-color: #' + rgbToHex($(this).css("background-color")) + ';}\r\n';
            }
            if (wrapper.hasClass("outer-banner")) {
                css += '#wrapper-' + counter + ' .full-banner {background: url(../images/qd_s' + counter + '_bg.png) no-repeat scroll center bottom / cover;}\r\n';
            }
            if (wrapper.find(".split-columns").length > 0) {
                var split = wrapper.find(".split-columns");
                var ul = split.find("ul:last");
                var li = split.find("li:last");
                var width = height = 0;
                ul.children("li").each(function(i) {
                    width += $(this).width();
                });
                split.children("ul").each(function(i) {
                    height += $(this).height();
                });
                var width = Math.floor(width / ul.children("li").length) + 2;
                var height = Math.floor(height / split.children("ul").length);
                var marginTop = parseInt(ul.css("margin-top").slice(0, -2));
                var marginLeft = parseInt(li.css("margin-left").slice(0, -2));
                css += '#wrapper-' + counter + ' {' + split.attr('style') + '}\r\n';
                if (marginTop > 0) {
                    css += '#wrapper-' + counter + ' .columns ul {width: 100%; min-width: ' + wrapperWidth + 'px; margin-top: ' + marginTop + 'px; float: left;}\r\n';
                    css += '#wrapper-' + counter + ' .columns ul:first-child {margin-top: 0;}\r\n';
                } else {
                    css += '#wrapper-' + counter + ' .columns ul {width: 100%; float: left;}\r\n';
                }
                if (marginLeft > 0) {
                    css += '#wrapper-' + counter + ' .columns li {width: ' + width + 'px; height: ' + height + 'px; margin-left: ' + marginLeft + 'px; float: left;}\r\n';
                    css += '#wrapper-' + counter + ' .columns li:first-child {margin-left: 0;}\r\n';
                } else {
                    css += '#wrapper-' + counter + ' .columns li {width: ' + width + 'px; height: ' + height + 'px; float: left;}\r\n';
                }
            }
        });
    }
    return css;
}

function getJquery(addons) {
    html = '';
    if (addons) {
        html += '<script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>\r\n';
    }
    return html;
}

function getBootstrap(addons) {
    html = '';
    if (addons) {
        html += '    <link rel="stylesheet" href="css/bootstrap.min.css" />\r\n';
        html += '    <!--[if lt IE 9]>\r\n';
        html += '    <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>\r\n';
        html += '    <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>\r\n';
        html += '    <![endif]-->\r\n';
    } else {
        html += '    <!--[if lt IE 9]>\r\n';
        html += '    <script src="http://cdn.bootcss.com/html5shiv/r29/html5.min.js"></script>\r\n';
        html += '    <![endif]-->\r\n';
    }
    return html;
}