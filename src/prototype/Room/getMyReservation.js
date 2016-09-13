Room.prototype.getMyReservation =
  function () {
    const reservation = this.getReservation();
    if (!reservation ||
        reservation.username !== getMyUsername()) {
      return;
    }
    return reservation;
  };
