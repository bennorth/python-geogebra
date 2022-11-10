Sk.builtins.Point = Sk.abstr.buildNativeClass("Point", {
  constructor: function Point(pyX, pyY) {
    const x = Sk.ffi.remapToJs(pyX);
    const y = Sk.ffi.remapToJs(pyY);

    const cmd = `(${x}, ${y})`;
    const lbl = ggbApi.evalCommandGetLabels(cmd);

    this.$ggbLabel = lbl;
  },
  slots: {
    tp$new(args, kwargs) {
      Sk.abstr.checkNoKwargs("Point", kwargs);
      Sk.abstr.checkArgsLen("Point", args, 2, 2);
      return new Sk.builtins.Point(...args);
    },
  },
});
