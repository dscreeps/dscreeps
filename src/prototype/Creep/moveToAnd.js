Creep.prototype.moveToAnd =
  function (functionName, args) {
    if (!Array.isArray(args)) {
      args = [args];
    }
    const ret = this[functionName].apply(this, args);
    if (ret === ERR_NOT_IN_RANGE) {
      this.moveTo(args[0]);
    } else {
      return ret;
    }
  };
