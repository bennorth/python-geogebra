var ggbApi;
var editor;
var oldconsole;
var fileHandle;

const GGB_POINT = "point";

// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) {
  var mypre = document.getElementById("output");
  mypre.innerHTML = mypre.innerHTML + text;
  //alert(text);
}
function builtinRead(x) {
  if (
    Sk.builtinFiles === undefined ||
    Sk.builtinFiles["files"][x] === undefined
  )
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

// make prompt work better. default seems to do alert(a) then prompt()
function customPrompt(a) {
  return prompt(a);
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
  // get contents of Ace editor
  var prog = editor.getValue();

  var mypre = document.getElementById("output");
  mypre.innerHTML = "";
  Sk.pre = "output";
  Sk.configure({
    output: outf,
    read: builtinRead,
    __future__: Sk.python3,
    inputfun: customPrompt,
    inputfunTakesPrompt: true /* then you need to output the prompt yourself */,
  });

  //(Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';

  var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody("<stdin>", false, prog, true);
  });

  myPromise.then(
    function (mod) {
      //console.log('success');
    },
    function (err) {
      console.log(err.toString());
    }
  );
}

Sk.builtins.alert = new Sk.builtin.func(function (s) {
  alert(Sk.ffi.remapToJs(s));
});

Sk.builtins.getValue = new Sk.builtin.func(function (v) {
  var ret = ggbApi.getValue(Sk.ffi.remapToJs(v));
  return Sk.ffi.remapToPy(ret);
});

Sk.builtins.setValue = new Sk.builtin.func(function (v, n) {
  ggbApi.setValue(Sk.ffi.remapToJs(v), Sk.ffi.remapToJs(n));
  return;
});

Sk.builtins.reset = new Sk.builtin.func(function () {
  ggbApi.reset();
  return;
});

Sk.builtins.circle = new Sk.builtin.func(function (x, y, r) {
  var labels = ggbApi.evalCommandGetLabels(
    "Circle((" +
      Sk.ffi.remapToJs(x) +
      "," +
      Sk.ffi.remapToJs(y) +
      ")," +
      Sk.ffi.remapToJs(r) +
      ")"
  );
  return Sk.ffi.remapToPy(labels[0]);
});

Sk.builtins.point = new Sk.builtin.func(function (x, y) {
  var labels = ggbApi.evalCommandGetLabels(
    "(" + Sk.ffi.remapToJs(x) + "," + Sk.ffi.remapToJs(y) + ")"
  );
  return Sk.ffi.remapToPy(labels[0]);
});

Sk.builtins.line = new Sk.builtin.func(function (pyLabel1, pyLabel2) {
  var jsLabel1 = Sk.ffi.remapToJs(pyLabel1);
  var jsLabel2 = Sk.ffi.remapToJs(pyLabel2);

  if (ggbApi.getObjectType(jsLabel1) != GGB_POINT) {
    throw jsLabel1 + " is not a point";
  }
  if (ggbApi.getObjectType(jsLabel2) != GGB_POINT) {
    throw jsLabel2 + " is not a point";
  }

  var labels = ggbApi.evalCommandGetLabels(
    "Line(" + jsLabel1 + "," + jsLabel2 + ")"
  );
  return Sk.ffi.remapToPy(labels[0]);
});

Sk.builtins.intersect = new Sk.builtin.func(function (pyLabel1, pyLabel2) {
  var jsLabel1 = Sk.ffi.remapToJs(pyLabel1);
  var jsLabel2 = Sk.ffi.remapToJs(pyLabel2);

  var labels = ggbApi.evalCommandGetLabels(
    "{Intersect(" + jsLabel1 + "," + jsLabel2 + ")}"
  );
  return Sk.ffi.remapToPy(labels[0]);
});

Sk.builtins.slider = new Sk.builtin.func(function (pyMin, pyMax, pyIncrement) {
  var jsMin = Sk.ffi.remapToJs(pyMin) || 0;
  var jsMax = Sk.ffi.remapToJs(pyMax) || 5;
  var jsIncrement = Sk.ffi.remapToJs(pyIncrement) || 0.1;

  var labels = ggbApi.evalCommandGetLabels(
    "Slider(" + jsMin + "," + jsMax + "," + jsIncrement + ")"
  );
  return Sk.ffi.remapToPy(labels[0]);
});

Sk.builtins.fitLine = new Sk.builtin.func(function (pyList) {
  var jsList = Sk.ffi.remapToJs(pyList);

  var ggbList = "{";
  for (var i = 0; i < jsList.length; i++) {
    if (ggbApi.getObjectType(jsList[i]) != GGB_POINT) {
      throw jsLabel1 + " is not a point";
    }

    ggbList += jsList[i] + ",";
  }
  // replace last , with }
  ggbList = ggbList.replace(/.$/, "}");

  var labels = ggbApi.evalCommandGetLabels("FitLine(" + ggbList + ")");
  return Sk.ffi.remapToPy(labels[0]);
});

Sk.builtins.fitPoly = new Sk.builtin.func(function (pyList, pyNum) {
  var jsList = Sk.ffi.remapToJs(pyList);
  var jsNum = Math.round(Sk.ffi.remapToJs(pyNum));

  var ggbList = "{";
  for (var i = 0; i < jsList.length; i++) {
    if (ggbApi.getObjectType(jsList[i]) != GGB_POINT) {
      throw jsLabel1 + " is not a point";
    }

    ggbList += jsList[i] + ",";
  }
  // replace last , with }
  ggbList = ggbList.replace(/.$/, "}");

  var labels = ggbApi.evalCommandGetLabels(
    "FitPoly(" + ggbList + "," + jsNum + ")"
  );
  return Sk.ffi.remapToPy(labels[0]);
});

Sk.builtins.deleteObject = new Sk.builtin.func(function (name) {
  ggbApi.deleteObject(Sk.ffi.remapToJs(name));
  return;
});

Sk.builtins.evalCommand = new Sk.builtin.func(function (s) {
  var ret = ggbApi.evalCommandGetLabels(Sk.ffi.remapToJs(s));
  return Sk.ffi.remapToPy(ret[0]);
});
