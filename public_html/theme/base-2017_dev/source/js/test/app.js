var assert = chai.assert;

describe("GLOBAL.currentBreakpoint", function(){
	it("should exists in CSS", function(){
		var breakpoint = window.getComputedStyle(
          document.querySelector('body'), ':before'
        ).getPropertyValue('content').replace(/\"/g, '');

        assert.notEqual(breakpoint, "none", "Breakpoints are not defined in CSS");
	});

	it("should have been defined after dom loaded", function(done){
		new APP.Document();

		window.addEventListener("DOMContentLoaded", function(){
			assert.notEqual(GLOBAL.currentBreakpoint, "", "GLOBAL.currentBreakpoint is empty!");
			assert.notEqual(GLOBAL.currentBreakpoint, "none", "GLOBAL.currentBreakpoint is not defined in CSS!!");
			done();
		});
	});
})