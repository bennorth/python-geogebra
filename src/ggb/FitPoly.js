Sk.builtins.FitPoly = Sk.abstr.buildNativeClass("FitPoly", {
  constructor: function FitPoly(pyList, pyObj) {
	  
	  
	  window.pyList = pyList;
	    
		// TODO: check why remapToJs() isn't working 
		// and remove hack
		//var jsList = Sk.ffi.remapToJs(pyList);
		var jsList = pyList.v;
	  
	// check first for GGB object, then assume numbers
    const jsNumOrLabel = pyObj.$ggbLabel || Math.round(Sk.ffi.remapToJs(pyObj));
	  oldconsole("jsList.length = " + jsList.length);
 var ggbList = "{";
  for (var i = 0; i < jsList.length; i++) {
	  oldconsole(jsList[i]);
    if (ggbApi.getObjectType(jsList[i].$ggbLabel) != GGB_POINT) {
      throw jsList[i] + " is not a point";
    }

    ggbList += jsList[i].$ggbLabel + ",";
  }
  // replace last , with }
  ggbList = ggbList.replace(/.$/, "}");
  
	  
	  // "FitPoly(" + ggbList + "," + jsNum + ")"
	    const cmd = `FitPoly(${ggbList}, ${jsNumOrLabel})`;
	
    this.$ggbLabel = ggbApi.evalCommandGetLabels(cmd);

  },
  slots: {
    tp$new(args, kwargs) {
      Sk.abstr.checkNoKwargs("FitPoly", kwargs);
      Sk.abstr.checkArgsLen("FitPoly", args, 2, 2);
      return new Sk.builtins.FitPoly(...args);
    },
  },
});
