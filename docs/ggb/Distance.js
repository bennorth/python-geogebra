Sk.builtins.Distance = new Sk.builtin.func(function (pyObj1, pyObj2) {
  // TODO: Check that pyObj1 and pyObj2 are Geogebra objects.

  const cmd = `Distance(${pyObj1.$ggbLabel}, ${pyObj2.$ggbLabel})`;
  const distObjLabel = ggbApi.evalCommandGetLabels(cmd);
  const distance = ggbApi.getValue(distObjLabel);
  ggbApi.deleteObject(distObjLabel);

  return new Sk.builtin.float_(distance);
});
