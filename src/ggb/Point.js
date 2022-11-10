Sk.builtins.Point = Sk.abstr.buildNativeClass("Point", {
  constructor: function Point(pyX, pyY) {
    const x = Sk.ffi.remapToJs(pyX);
    const y = Sk.ffi.remapToJs(pyY);

    const cmd = `(${x}, ${y})`;
    const lbl = ggbApi.evalCommandGetLabels(cmd);

    this.$ggbLabel = lbl;

    this.$updateHandlers = [];
  },
  slots: {
    tp$new(args, kwargs) {
      Sk.abstr.checkNoKwargs("Point", kwargs);
      Sk.abstr.checkArgsLen("Point", args, 2, 2);
      return new Sk.builtins.Point(...args);
    },
  },
  proto: {
    $xCoord() {
      return ggbApi.getXcoord(this.$ggbLabel);
    },
    $yCoord() {
      return ggbApi.getYcoord(this.$ggbLabel);
    },
    $fireUpdateEvents() {
      this.$updateHandlers.forEach((fun) => {
        Sk.misceval.callsimOrSuspend(fun);
      });
    },
  },
  methods: {
    when_moved: {
      $meth(pyFun) {
        this.$updateHandlers.push(pyFun);
        return pyFun;
      },
      $flags: { OneArg: true },
    },
  },
  getsets: {
    x: {
      $get() {
        return new Sk.builtin.float_(this.$xCoord());
      },
    },
    y: {
      $get() {
        return new Sk.builtin.float_(this.$yCoord());
      },
    },
  },
});
