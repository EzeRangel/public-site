// Heavily based on Timber's way for Javascript Handling

/* Run function after window resize */
var afterResize=(function(){var t={};return function(callback,ms,uniqueId){if(!uniqueId){uniqueId="Don't call this twice without a uniqueId";}if(t[uniqueId]){clearTimeout(t[uniqueId]);}t[uniqueId]=setTimeout(callback,ms);};})();

window.ancla = window.ancla || {};

ancla.cacheSelectors = function () {
  ancla.cache = {
    // General
    $html                : $('html'),
    $body                : $('body'),
    $window              : $(window),
    $pageWrapper         : $('.page-wrapper'),

   // Swiper
    $swiper              : $('.swiper-container')
  };
};

ancla.variables = function () {
  ancla.variables = {
    mobileNavOpen   : false,
    breakpointLarge : 1025,
    menuBtnCacheSrc : null,
    currentBreakpoint : null
  };
};

ancla.init = function () {
  ancla.cacheSelectors();
  ancla.variables();
  ancla.fastclick();
  // ancla.menu();
  ancla.breakpoints();
  ancla.swiper();
  // ancla.magnificPopup();
  // ancla.accessibleNav();
  // ancla.sliders();
  // ancla.productImageSwitch();
  // ancla.responsiveVideos();
  // ancla.socialSharing();
  // ancla.menuDropdownCheck();
  // ancla.setFilterLabels();
  // ancla.setQueryParams();
  // ancla.collectionSorting();
  // ancla.rteBannerImages();
  // ancla.productImageZoom();

  // Bind Events
  // ancla.cache.$sortDropdown.on('change', ancla.sortCollection);
  // ancla.cache.$tagList.on('change', ancla.filterCollection);
};

// Get current breakpoints from CSS
ancla.refreshBreakpointValue = function () {
    ancla.variables.currentBreakpoint = window.getComputedStyle(
      document.querySelector('body'), ':before'
    ).getPropertyValue('content').replace(/\"/g, '');
};

ancla.breakpoints = function () {
    $(window).resize(function() {
        afterResize(function(){
            ancla.refreshBreakpointValue();
            // console.log(ancla.variables.currentBreakpoint); // Uncomment to debug CSS breakpoints
        }, 200, 'breakpoint');
    });
};

ancla.magnificPopup = function () {
  var $magnific = ancla.cache.$magnific,
      magnificOptions = {
          type: 'image',
          gallery: { enabled: true },
          disableOn: 400,
          closeBtnInside: true,
          enableEscapeKey: true,
          mainClass: 'mfp-with-zoom',
          zoom: {
              enabled: true,
              duration: 300,
              easing: 'ease-in-out'
          }
      };

  if ($magnific.length) {
    $(window).on('load', function() {
        $magnific.magnificPopup(magnificOptions);
    });
  }
};


ancla.fastclick = function () {
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }
};

ancla.menu = function () {
  ancla.menuCheck();

  ancla.cache.$menu.on('click', function(evt) {
    evt.preventDefault();

    if (ancla.variables.mobileNavOpen) {
      ancla.menuClose();
    } else {
      ancla.menuOpen();
    }
  });

  $(window).resize(function() {
    afterResize(function(){
      ancla.menuCheck();
    }, 200, 'id');
  });
};

ancla.menuCheck = function() {
  var width = ancla.getWidth();

  if (width > ancla.variables.breakpointLarge) {
    ancla.menuClose();
  }
};

ancla.menuClose = function() {
  ancla.cache.$body.removeClass('has-nav-open');

  ancla.variables.mobileNavOpen = false;

  //Switch back to original class and icon
  $('svg', ancla.cache.$menu).attr('class', ancla.variables.menuBtnCacheSrc);
  $('use', ancla.cache.$menu).attr('xlink:href', '#' + ancla.variables.menuBtnCacheSrc);

  ancla.cache.$pageWrapper.off('click.mobileNavOpen');
};

ancla.menuOpen = function() {
  // Save initial icon in cache for later use
  ancla.variables.menuBtnCacheSrc = $('svg', ancla.cache.$menu).attr('class');

  //setTimeout value should reflect CSS animation speeds
  setTimeout(function () {
    ancla.cache.$body.addClass('has-nav-open');
    ancla.variables.mobileNavOpen = true;

    //Switch SVG class and icon to close
    $('svg', ancla.cache.$menu).attr('class', 'icon-close');
    $('use', ancla.cache.$menu).attr('xlink:href', '#icon-close');
  }, 300);

  ancla.cache.$pageWrapper.on('click.mobileNavOpen', function(){
    if(ancla.variables.mobileNavOpen) {
      ancla.menuClose();
    }

  });
};

ancla.getWidth = function() {
  return window.innerWidth;
};

ancla.swiper = function () {
    var $swiper = ancla.cache.$swiper,
    swiperArgs = {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        mousewheelControl: true,
        keyboardControl: true,
        hashnav: true,
        hashnavWatchState: true
    };

    if ($swiper.length) {
      var swiper = new Swiper($swiper, swiperArgs);
    }
};

// Initialize Ancla's JS on docready
$(ancla.init);
