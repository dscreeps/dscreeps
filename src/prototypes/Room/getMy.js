Room.prototype.getMy =
  function () {
    if (!this.controller) {
      return;
    }
    return this.controller.my;
  };
