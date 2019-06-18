jQuery(document).ready(function(event){
  var isAnimating = false,
    newLocation = '';
    firstLoad = false;

  $('#begin-btn').on('click', function(event){
    event.preventDefault();
    var newPage = $(this).attr('href');
    if( !isAnimating ) changePage(newPage, true);
    firstLoad = true;
  });

  $(window).on('popstate', function() {
  	if( firstLoad ) {
      var newPageArray = location.pathname.split('/'),
        newPage = newPageArray[newPageArray.length - 1];

      if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
    }
    firstLoad = true;
	});

	function changePage(url, bool) {
    isAnimating = true;
    $('body').addClass('page-is-changing');
    $('#animation-img').hide();
    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
    	loadNewContent(url, bool);
      newLocation = url;
      $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    if( !transitionsSupported() ) {
      loadNewContent(url, bool);
      newLocation = url;
    }
	}

	function loadNewContent(url, bool) {
		url = ('' == url) ? 'index.html' : url;
  	var newSection = 'cd-'+url.replace('.html', '');
      var delay = ( transitionsSupported() ) ? 1200 : 0;
      setTimeout(function(){
        $('body').removeClass('page-is-changing');
        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          isAnimating = false;
          window.location.href="menu.html"
        });
        $('main').hide()
        if( !transitionsSupported() ) isAnimating = false;
      }, delay);
  }

  function transitionsSupported() {
    return $('html').hasClass('csstransitions');
  }
});

(function(){
  setInterval(function() {
    $('#begin').toggleClass('shrink');
  }, 300 );
})();
