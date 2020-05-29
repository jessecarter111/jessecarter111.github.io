console.log($('.content').attr('class'));
console.log($('body').attr('class'));

$(document).ready(function () {
    if(!Cookies.get('color')){
        Cookies.set('color', 'black');
    }
    reverse(Cookies.get("color"));
    animate();
});

function reverse(color){
    if (color == 'white'){
        $('body').removeClass('white');
        $('.content').removeClass('black');
        $('body').addClass('black');
        $('.content').addClass('white');
        $("#globe-gif").attr('src', 'assets/img/gif/globe-black.gif');
        Cookies.set('color', 'black');
    }
    if (color == 'black') {
        $('body').removeClass('black');
        $('.content').removeClass('white');
        $('body').addClass('white');
        $('.content').addClass('black');
        $("#globe-gif").attr('src', 'assets/img/gif/globe-white.gif');
        Cookies.set('color', 'white');
    }
}

function animate() {
    $('.content').addClass('animate_content');
    /*
    $('.page_description').fadeOut(100).delay(2800).fadeIn();
    setTimeout(function () {
        $('.cotent').removeClass('animate_content');
    }, 3200);

    setTimeout(function () {
        $('.content').removeClass('fadeIn');
    }, 1500);
    */
}

function setLinks() {
    $('.index_link').click(function () {
        setTimeout(function () {
            $('.index').addClass('fadeIn');
        }, 1500);
    });

    $('.work_link').click(function () {
        setTimeout(function () {
            $('.work').addClass('fadeIn');
        }, 1500);
    });
}
