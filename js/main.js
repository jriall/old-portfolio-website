//run fakeloader
$("#fakeLoader").fakeLoader({
  timeToHide: 500,
  zIndex: 9999,
  spinner: "spinner7",
  bgColor: "#6fbd8d"
});

$(document).ready(function() {
  //handling google form submission
  var submitted = false;
  $('#gform').on('submit', function(e) {
    $('#gform *').fadeOut(2000);
    $('#gform').prepend('<p>Your submission has been processed...</p>');
  });

  $(window).scroll(function() {
    //as the user scrolls down the page, the cover text div fades out.
    $(".cover-text").css({
      'opacity': 1 - (($(window).scrollTop()) / ($(window).height() / 1.9))
    });
    $("#cover-scroll").css({
      'opacity': 1 - (($(window).scrollTop()) / ($(window).height() / 4))
    });
    //remove fixed position below the cover page in order to not interfere with the rest of the page.
    if ($(window).scrollTop() <= $(window).height()) {
      $(".cover-text, #cover-scroll").addClass("fixed");
    } else {
      $(".cover-text, #cover-scroll").removeClass("fixed");
    }
    //as the user scrolls down the page, the background color of the navbar fades in proportionately to how far down the cover page we are.
    var percentage = $(document).scrollTop() / $(window).height() * 1.1;
    var rgba = "rgba(111, 189, 141, " + percentage;
    $(".navbar-custom").css("background-color", rgba);

    //menu li items are highlighted when the user scrolls onto their respective sections by comparing scroll position to section position
    var sectionPosition = $('body').find('.section-position');
    for (var i = 0; i < sectionPosition.length; i++) {
      if ($(document).scrollTop() > $(sectionPosition[i]).offset().top - 500 && $(document).scrollTop() < $(sectionPosition[i]).offset().top + $(sectionPosition[i]).height() - 500) {
        $('.navbar-custom .nav li a[href="#' + $(sectionPosition[i]).attr("id") + '"]').css("border", "2px solid white").css("border-radius", "5px");
      } else {
        $('.navbar-custom .nav li a[href="#' + $(sectionPosition[i]).attr("id") + '"]').css("border", "2px transparent");
      }
    }
    //fade in content as we scroll down the page
    //this isn't very DRY as we've used almost identical code to the above, however, it gives us more flexibility with fade-position classes as it doesn't
    //tie us down to the section-position classes
    var fadePosition = $('body').find('.fade-position');
    for (var j = 0; j < fadePosition.length; j++) {
      // if ($(document).scrollTop() > $(fadePosition[j]).offset().top - 800 && $(document).scrollTop() < $(fadePosition[j]).offset().top + $(fadePosition[j]).height() - 500) {
      if ($(document).scrollTop() > $(fadePosition[j]).offset().top - 800 && $(document).scrollTop() < $(fadePosition[j]).offset().top + $(fadePosition[j]).height() - 500) {
        $(fadePosition[j]).animate({ 'opacity': '1' }, 1500);
      }
    }
  });

  //call the parallax scrolling plugin for the cover image
  $('.cover-page').parallax({
    speed: 0.2
  });

  //navigation arrows bounce on hover
  $('.bouncey').bind('mouseenter', function() {
    $(this).find('i').effect("bounce", { times: 3 }, 1000);
  });

  //load google maps api
  function init_map() {
    var myOptions = { zoom: 11, center: new google.maps.LatLng(51.4668445, -0.17063340000004246), mapTypeId: google.maps.MapTypeId.ROADMAP, scrollwheel: false };
    map = new google.maps.Map(document.getElementById('google-maps-container'), myOptions);
    marker = new google.maps.Marker({ map: map, position: new google.maps.LatLng(51.4668445, -0.17063340000004246) });
  }
  google.maps.event.addDomListener(window, 'load', init_map);

  //initialise smoothscroll
  smoothScroll.init({
    speed: 500,
    easing: 'easeInOutQuad',
    offset: 80
  });

  //backstretch plugin
  $('.cover-page').backstretch([
    "images/indonesia.jpg",
    "images/fog.jpg",
    "images/south-tyrol.jpg"
  ], { duration: 5000, fade: 2000 });

  $('.image-container').hover(function() {
    $(this).children('img').toggleClass('project-hover');
  });
  //close navbar menu on click
  $('.nav a').on('click', function(){
    $('.navbar-toggle').click();
  });
});
