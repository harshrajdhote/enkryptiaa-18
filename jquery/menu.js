jQuery(document).ready(function(){
  jQuery(window).load(function() {
    jQuery('.open-overlay').css('pointer-events', 'none');
    var overlay_navigation = jQuery('.overlay-navigation'),
      top_bar = jQuery('.bar-top'),
      middle_bar = jQuery('.bar-middle'),
      bottom_bar = jQuery('.bar-bottom');

    overlay_navigation.toggleClass('overlay-active');
    if (overlay_navigation.hasClass('overlay-active')) {

      top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
      middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
      bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
      overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
      overlay_navigation.velocity('transition.slideLeftIn', {
        duration: 300,
        delay: 0,
        begin: function() {
          jQuery('nav ul li').velocity('transition.perspectiveLeftIn', {
            stagger: 150,
            delay: 0,
            complete: function() {
              jQuery('nav ul li a').velocity({
                opacity: [1, 0],
              }, {
                delay: 10,
                duration: 140
              });
              jQuery('.open-overlay').css('pointer-events', 'auto');
            }
          })
        }
      })

    }
  })

});

function exitAnimation(link) {
  jQuery('.open-overlay').css('pointer-events', 'none');
  var overlay_navigation = jQuery('.overlay-navigation'),
    top_bar = jQuery('.bar-top'),
    middle_bar = jQuery('.bar-middle'),
    bottom_bar = jQuery('.bar-bottom');
  overlay_navigation.toggleClass('overlay-active');

  jQuery('.open-overlay').css('pointer-events', 'none');
  top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
  middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
  bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
  overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
  jQuery('nav ul li').velocity('transition.perspectiveRightOut', {
    stagger: 150,
    delay: 0,
    complete: function() {
      overlay_navigation.velocity('transition.fadeOut', {
        delay: 0,
        duration: 300,
        complete: function() {
          jQuery('nav ul li a').velocity({
            opacity: [0, 1],
          }, {
            delay: 0,
            duration: 50
          });
          window.location.href=link;
        }
      });
    }
  })
}