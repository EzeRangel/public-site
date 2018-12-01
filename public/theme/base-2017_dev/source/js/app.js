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

//

APP.KC = function(){
    this.init();
}

APP.KC.prototype = {
    init: () => {
        const allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down',
          65: 'a',
          66: 'b'
        };

        const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

        function activateCheats() {
            var style = document.createElement('link');

            style.onload = function(){
                document.body.classList.add("t-nintendo")

                alert("WHAT A HORRIBLE NIGHT TO HAVE A CURSE.");
            }

            style.setAttribute("href", "https://unpkg.com/nes.css@0.0.2/css/nes.min.css");
            style.setAttribute("rel", "stylesheet")

            document.head.appendChild(style);

        }

        // a variable to remember the 'position' the user has reached so far.
        var konamiCodePosition = 0;

        // add keydown event listener
        document.addEventListener('keydown', function(e) {
          // get the value of the key code from the key map
          var key = allowedKeys[e.keyCode];
          // get the value of the required key from the konami code
          var requiredKey = konamiCode[konamiCodePosition];

          // compare the key with the required key
          if (key == requiredKey) {

            // move to the next key in the konami code sequence
            konamiCodePosition++;

            // if the last key is reached, activate cheats
            if (konamiCodePosition == konamiCode.length) {
              activateCheats();
              konamiCodePosition = 0;
              console.log("Done")
            }
          } else {
            konamiCodePosition = 0;
          }
        });
    }
}

new APP.Document();
new APP.Interactions();
new APP.KC();
