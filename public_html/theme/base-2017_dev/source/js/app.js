var APP  = {};

APP.Document = function(){
  this.refreshBreakpoint();
};

APP.Document.prototype = {
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

//

APP.Interactions = function(){
    this.setTopBarAnimation();
};

APP.Interactions.prototype = {
    setTopBarAnimation: () => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };

        const animation = () => {
            const topbar = document.querySelector('.c-topbar');
            topbar.classList.toggle('is-static');
        };

        const target = document.querySelector('.c-masthead');

        const observer = new IntersectionObserver(animation, options);
        observer.observe(target);
    }
};

new APP.Document();
new APP.Interactions();
