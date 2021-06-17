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
            if ($(this).scrollTop() > 736 && $(this).scrollTop() < 1446){
                $('.navbar .contact').removeClass('active');
                $('.navbar .about').addClass('active');
            }
            else if ($(this).scrollTop() > 1535) {
                $('.navbar .about').removeClass('active');
                $('.navbar .contact').addClass('active');
            }
        });
    });

    // $(function () {
    //     $(window).scroll(function () {
    //         var thing = $("div.items").not(":hidden").prop("id");
    //         $('.navbar a').filter(function () {
    //             console.log(location.href);
    //             return this.href === location.href;
    //         }).addClass('active');
    //     });
    // });
    // $(function () {
    //     $(window).scroll(function () {
    //         var divID = $("div.main-section").filter(":visible").attr("id");
    //         console.log(String(divID))
    //         $('.navbar .active').removeClass('active');
    //         // $('#' + divID).addClass('active');
    //     });
    // });

});