jQuery(document).ready(function (event) {
  var isAnimating = false,
    newLocation = '';
  firstLoad = false;
  //trigger smooth transition from the actual page to the new one 
  $('main').on('click', '[data-type="page-transition"]', function (event) {
    event.preventDefault();
    //detect which page has been selected
    console.log('this: ' + $(this).attr('href'));
    var newPage = $(this).attr('href');
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
    isAnimating = true;
    // trigger page animation
    $('body').addClass('page-is-changing');
    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
      loadNewContent(url, bool);
      newLocation = url;
      $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    //if browser doesn't support CSS transitions
    if (!transitionsSupported()) {
      loadNewContent(url, bool);
      newLocation = url;
    }
  }

  function loadNewContent(url, bool) {
    url = ('' == url) ? 'index.html' : url;
    var newSection = 'cd-' + url.replace('.html', '');
    var section = $('<div class="cd-main-content ' + newSection + '"></div>');
    console.log('loading .cd-main-content');
    section.load(url + ' .cd-main-content > *', function (event) {
      // load new content and replace <main> content with the new one
      $('main').html(section);
      //if browser doesn't support CSS transitions - dont wait for the end of transitions
      var delay = (transitionsSupported()) ? 1200 : 0;
      setTimeout(function () {
        reverse(Cookies.get("color"));
        //wait for the end of the transition on the loading bar before revealing the new content
        //(section.hasClass('cd-about')) ? $('body').addClass('cd-about'): $('body').removeClass('cd-about');
        $('body').removeClass('page-is-changing');
        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          isAnimating = false;
          $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });

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

  function reverse(color) {
    if (color == 'white') {
      $("#globe-gif").attr('src', 'img/gif/globe-white.gif');
      $('body').removeClass('white');
      $('.content').removeClass('black');
      $('body').addClass('black');
      $('.content').addClass('white');
      $('.cd-loading-content').attr('background-color', 'black');
      Cookies.set('color', 'black');
    }
    if (color == 'black') {
      $("#globe-gif").attr('src', 'img/gif/globe-black.gif');
      $('body').removeClass('black');
      $('.content').removeClass('white');
      $('body').addClass('white');
      $('.content').addClass('black');
      $('.cd-loading-content').attr('background-color', 'white');
      Cookies.set('color', 'white');
    }
  }
});