$(document).ready(function(){
    var $nav = $('.navbar');//Caching element
    // hide .navbar first - you can also do this in css .nav{display:none;}
    $nav.hide();

    // fade in .navbar
    $(function () {
        $(window).scroll(function () {
            // set distance user needs to scroll before we start fadeIn
            if ($(this).scrollTop() > 736) { //For dynamic effect use $nav.height() instead of '100'
                $nav.fadeIn(750);
            } else {
                $nav.fadeOut(750);
            }
        });
    });

    $(function () {
        $('.navbar a').filter(function () {
            return this.href === location.href;
        }).addClass('active');
    });

});