var expanded = false;

var Boxlayout = function () {

    var wrapper = document.body,
        sections = Array.from(document.querySelectorAll('.section')),
        closeButtons = Array.from(document.querySelectorAll('.close-section')),
        expandedClass = 'is-expanded',
        hasExpandedClass = 'has-expanded-item';

    return {
        init: init
    };

    function init() {
        _initEvents();
    }

    function _initEvents() {
        sections.forEach(function (element) {
            element.onclick = function () {
                _openSection(this);
            };
        });
        closeButtons.forEach(function (element) {
            element.onclick = function (element) {
                element.stopPropagation();
                _closeSection(this.parentElement);
            };
        });
    }

    function _openSection(element) {
        if (!element.classList.contains(expandedClass)) {
            expanded = true;
            console.log(element.classList);
            element.classList.add(expandedClass);
            wrapper.classList.add(hasExpandedClass);
            $('.box-content').fadeOut(100).delay(300).fadeIn();
            $('.demo-box').fadeOut(100);
            if (window.matchMedia("(max-width: 700px)").matches) {
                setTimeout(function () {
                    $(".arrow").css("visibility", "hidden");
                }, 100);
            } else {
                setTimeout(function () {
                    $(".arrow").css("visibility", "visible");
                }, 100);
            }
        }
    }

    function _closeSection(element) {
        if (element.classList.contains(expandedClass)) {
            expanded = false;
            element.classList.remove(expandedClass);
            wrapper.classList.remove(hasExpandedClass);
            $('.box-content').fadeIn(100).delay(300).fadeOut();
            $('.demo-box').fadeIn(100);
            $(".arrow").delay(100).css("visibility", "hidden");
        }
    }

}();

const navSlide = () => {
    const hamburg = document.querySelector('.hamburg');
    const nav = document.querySelector('.nav-links');
    const navlinks = document.querySelectorAll('.nav-links li');

    //Toggle Nav
    hamburg.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        console.log("Ayo this shit working?");

        //Animate links
        navlinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ``;
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 3 + 0.5}s`
            }

        });
        hamburg.classList.toggle('toggle');
    });

}

function resize() {
    if (window.matchMedia("(max-width: 700px)").matches) {
        setTimeout(function () {
            $(".arrow").css("visibility", "hidden");
        }, 100);
    } else if (!(window.matchMedia("(max-width: 700px)").matches) && expanded) {
        setTimeout(function () {
            $(".arrow").css("visibility", "visible");
        }, 100);
    }
}

// function is_touch_enabled() {
//     if (('ontouchstart' in window) ||
//         (navigator.maxTouchPoints > 0) ||
//         (navigator.msMaxTouchPoints > 0)) {
//             console.log("No touch detected");
//             document.querySelector('nav').addClass('touch');
//     } else {
//         $('nav').addClass('no-touch');
//         console.log("No touch detected");
//     }
// }

// is_touch_enabled();
window.onresize = resize;
navSlide();
Boxlayout.init();
