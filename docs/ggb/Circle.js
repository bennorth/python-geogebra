Sk.builtins.Circle = Sk.abstr.buildNativeClass("Circle", {
  constructor: function Point(pyObj1, pyObj2, pyObj3) {
    // check first for GGB object, then assume numbers
    const ggbLabel1 = pyObj1.$ggbLabel || Sk.ffi.remapToJs(pyObj1);
    const ggbLabel2 = pyObj2.$ggbLabel || Sk.ffi.remapToJs(pyObj2);
    const ggbLabel3 =
      pyObj3 == null ? null : pyObj3.$ggbLabel || Sk.ffi.remapToJs(pyObj3);

    if (ggbLabel1 == null || ggbLabel2 == null)
      throw new Sk.builtin.TypeError("not GGB things or numbers");

    var cmd;

    if (ggbLabel3 == null) {
      // Circle(point, number)
      cmd = `Circle(${ggbLabel1}, ${ggbLabel2})`;
    } else {
      // Circle(number, number, number)
      cmd = `Circle((${ggbLabel1}, ${ggbLabel2}), ${ggbLabel3})`;
    }

    this.$ggbLabel = ggbApi.evalCommandGetLabels(cmd);
  },
  slots: {
    tp$new(args, kwargs) {
      Sk.abstr.checkNoKwargs("Circle", kwargs);
      Sk.abstr.checkArgsLen("Circle", args, 2, 3);
      return new Sk.builtins.Circle(...args);
    },
  },
});
