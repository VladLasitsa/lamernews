var $ = require('jquery');
module.exports = function(window) {
    $(document).ready(function() {
        var top_show = 100;
        var delay = 800;
        $(window).scroll(function() {
            console.log($(document).height());
            if ($(this).scrollTop() > top_show) {
                $('#scrollup').fadeIn();
            } else {
                $('#scrollup').fadeOut();
            }
            if ($(window).scrollTop() >= $(document).height() - "667") {
                $("#scrolldown").fadeOut();
            } else {
                $("#scrolldown").fadeIn();
            }
        });
        $('#scrollup').click(function() {
            $('body, html').animate({
                scrollTop: 0
            }, delay);
        });
        $('#scrolldown').click(function() {
            $('body, html').animate({
                scrollTop: $(document).height()
            }, delay);
        });
    });
};
