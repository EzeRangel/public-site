var APP  = {};

APP.Page = function(){
  this.refreshBreakpoint();
};

APP.Page.prototype = {
  refreshBreakpoint: function(){
    var ob       = UTIL.observable();
    var mutation = function(evt){
      function setBreakpointValue(){
        GLOBAL.currentBreakpoint = window.getComputedStyle(
          document.querySelector('body'), ':before'
        ).getPropertyValue('content').replace(/\"/g, '');
      };

      if (evt.type === 'resize') {
        UTIL.afterResize(function(){
          setBreakpointValue();
        })
      }else{
        setBreakpointValue();
      }
    };
    var handleEvents = function(evt){
      ob(evt);
    };

    ob.subscribe(mutation);

    window.addEventListener("DOMContentLoaded", handleEvents);
    window.addEventListener("resize", handleEvents);
  }
};

new APP.Page();