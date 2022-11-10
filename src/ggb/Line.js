Sk.builtins.Line = Sk.abstr.buildNativeClass("Line", {
  constructor: function Point(pyObj1, pyObj2) {
    const ggbLabel1 = pyObj1.$ggbLabel;
    const ggbLabel2 = pyObj2.$ggbLabel;
    const cmd = `Line(${ggbLabel1}, ${ggbLabel2})`;
    this.$ggbLabel = ggbApi.evalCommandGetLabels(cmd);
  },
  slots: {
    tp$new(args, kwargs) {
      Sk.abstr.checkNoKwargs("Line", kwargs);
      Sk.abstr.checkArgsLen("Line", args, 2, 2);
      return new Sk.builtins.Line(...args);
    },
  },
});
