Room.prototype.getMyReservation =
  function () {
    const reservation = this.getReservation();
    if (!reservation ||
        reservation.username !== Game.Memory.username) {
      return;
    }
    return reservation;
  };
