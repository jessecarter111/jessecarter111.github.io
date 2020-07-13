$(document).ready(function () {
    //Reverse the color scheme
    if (!Cookies.get('color')) {
        Cookies.set('color', 'black');
    }
    reverse(Cookies.get("color"));

    $('.experience_nav').click(function () {
        // animate content
        $('.transition').addClass('animate_content');
        $('.page__description').fadeOut(100).delay(2800).fadeIn();

        setTimeout(function () {
            $('.transition').removeClass('animate_content');
        }, 3200);

        //remove fadeIn class after 1500ms
        setTimeout(function () {
            $('.transition').removeClass('fadeIn');
        }, 1500);

    });

    // on click show page after 1500ms
    $('.IT_link').click(function () {
        setTimeout(function () {
            $('.intertalk').addClass('fadeIn');
        }, 1500);
    });

    $('.LM_link').click(function () {
        setTimeout(function () {
            $('.lockheed').addClass('fadeIn');
        }, 1500);
    });

    $('.MR_link').click(function () {
        setTimeout(function () {
            $('.mathresources').addClass('fadeIn');
        }, 1500);
    });

    $('.IL_link').click(function () {
        setTimeout(function () {
            $('.inkline').addClass('fadeIn');
        }, 1500);
    });


    function reverse(color) {
        if (color == 'white') {
            $('body').removeClass('white');
            $('.content').removeClass('black');
            $('body').addClass('black');
            $('.content').addClass('white');
            $("#globe-gif").attr('src', 'img/gif/globe-white.gif');
            Cookies.set('color', 'black');
        }
        if (color == 'black') {
            $('body').removeClass('black');
            $('.content').removeClass('white');
            $('body').addClass('white');
            $('.content').addClass('black');
            $("#globe-gif").attr('src', 'img/gif/globe-black.gif');
            Cookies.set('color', 'white');
        }
    }
});