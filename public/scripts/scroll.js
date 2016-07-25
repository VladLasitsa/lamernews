var $ = require('jquery');
module.exports = function(window) {
    $(document).ready(function() {
        var top_show = 100;
        var delay = 800;
        var height = $(document).height();

        $(window).scroll(function() {
            console.log(height);
            if ($(this).scrollTop() > top_show) {
                $('#scrollup').fadeIn();
            } else {
                $('#scrollup').fadeOut();
            }
            if ($(window).scrollTop() >= height - "999") {
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
