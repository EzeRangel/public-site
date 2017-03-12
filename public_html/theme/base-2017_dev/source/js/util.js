var GLOBAL = {
  currentBreakpoint: ""
};


var UTIL = {
  afterResize: (function(){var t={};return function(callback,ms,uniqueId){if(!uniqueId){uniqueId='Don\'t call this twice without a uniqueId';}if(t[uniqueId]){clearTimeout(t[uniqueId]);}t[uniqueId]=setTimeout(callback,ms);};})(),
  observable:  function(value){
    var listeners = [];

    function notify(newValue){
      listeners.forEach(function(listener){ listener(newValue) });
    };

    function accessor(newValue){
      if (arguments.length && newValue !== value) {
        value = newValue;
        notify(newValue);
      };

      return value;
    };

    accessor.subscribe = function(listener){ listeners.push(listener); };

    return accessor;
  }
};