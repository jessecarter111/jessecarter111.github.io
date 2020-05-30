jQuery(document).ready(function (event) {
    var isAnimating = false,
        newLocation = '';
    firstLoad = false;

    //trigger smooth transition from the actual page to the new one 
    $('body').on('click', '[data-type="page-transition"]', function (event) {
        console.log("Click registered preventing default");
        event.preventDefault();
        //detect which page has been selected
        var newPage = $(this).attr('href');
        console.log("newPage = " + newPage);
        //if the page is not already being animated - trigger animation
        if (!isAnimating) changePage(newPage, true);
        firstLoad = true;
    });

    //detect the 'popstate' event - e.g. user clicking the back button
    $(window).on('popstate', function () {
        if (firstLoad) {
            /*
            Safari emits a popstate event on page load - check if firstLoad is true before animating
            if it's false - the page has just been loaded 
            */
            var newPageArray = location.pathname.split('/'),
                //this is the url of the page to be loaded 
                newPage = newPageArray[newPageArray.length - 1];

            if (!isAnimating && newLocation != newPage) changePage(newPage, false);
        }
        firstLoad = true;
    });

    function changePage(url, bool) {
        console.log("changePage");
        isAnimating = true;
        // trigger page animation
        $('.content').addClass('animate_content');

        setTimeout(function () {
            $('.cotent').removeClass('animate_content');
        }, 3200);

        setTimeout(function () {
            $('.content').removeClass('fadeIn');
        }, 1500);
        setLinks();
        loadNewContent(url, bool);
        newLocation = url;
        //if browser doesn't support CSS transitions
        if (!transitionsSupported()) {
            loadNewContent(url, bool);
            newLocation = url;
        }
    }

    function loadNewContent(url, bool) {
        console.log("loadNewContent");
        url = ('' == url) ? 'index.html' : url;
        console.log("url: " + url);
        //url = "if url is empty -> make it index.html otherwise make it url"
        var newSection = '' + url.replace('.html', '');
        console.log("newSection: " + newSection);
        //remove the html tag
        var section = $('<div class="content ' + newSection + '"></div>');
        console.log("secton: " + section);
        section.load(url + ' .content > *', function (event) {
            // load new content and replace <main> content with the new one
            console.log();
            $('.page_description').html(section);
            //if browser doesn't support CSS transitions - dont wait for the end of transitions
            var delay = (transitionsSupported()) ? 1200 : 0;
            setTimeout(function () {
                //wait for the end of the transition on the loading bar before revealing the new content

                $('body').removeClass('page-is-changing');
                isAnimating = false;
                if (!transitionsSupported()) isAnimating = false;
            }, delay);

            if (url != window.location && bool) {
                //add the new page to the window.history
                //if the new page was triggered by a 'popstate' event, don't add it
                window.history.pushState({
                    path: url
                }, '', url);
            }
        });
    }

    function transitionsSupported() {
        return $('html').hasClass('csstransitions');
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
});
