Room.prototype.getReservation =
  function () {
    if (!this.controller) {
      return;
    }
    return this.controller.reservation;
  };
