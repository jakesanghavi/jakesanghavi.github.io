$(document).ready(function(){
    var $nav = $('.navbar');//Caching element
    // hide .navbar first - you can also do this in css .nav{display:none;}
    $nav.hide();

    // fade in .navbar
    $(function () {
        $(window).scroll(function () {
            // set distance user needs to scroll before we start fadeIn
            console.log($(this).scrollTop())
            if ($(this).scrollTop() > 736) { //For dynamic effect use $nav.height() instead of '100'
                $nav.fadeIn(750);
            } else {
                $nav.fadeOut(750);
            }
            if ($(this).scrollTop() > 736 && $(this).scrollTop() < 1436){
                $('.navbar .projects').removeClass('active');
                $('.navbar .contact').removeClass('active');
                $('.navbar .about').addClass('active');
            }
            else if ($(this).scrollTop() > 1536 && $(this).scrollTop() < 2236) {
                $('.navbar .about').removeClass('active');
                $('.navbar .contact').removeClass('active');
                $('.navbar .projects').addClass('active');
            }
            else if ($(this).scrollTop() > 2336) {
                $('.navbar .about').removeClass('active');
                $('.navbar .projects').removeClass('active');
                $('.navbar .contact').addClass('active');
            }
        });
    });
});