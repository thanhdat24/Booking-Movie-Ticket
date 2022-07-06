let danhSachGheDangDat = [];
const addSeat = (newSeat) => {
  if (danhSachGheDangDat.length == 0) {
    danhSachGheDangDat = [...danhSachGheDangDat, newSeat];
  } else {
    let index = danhSachGheDangDat.findIndex(
      (item) => item.fullName === newSeat.fullName
    );

    if (index !== -1) {
      danhSachGheDangDat[index].danhSachGheDangDat = newSeat.danhSachGheDangDat;
    } else {
      danhSachGheDangDat = [...danhSachGheDangDat, newSeat];
    }
  }
};

const removeSeat = (id) =>
  (danhSachGheDangDat = danhSachGheDangDat.filter((item) => item.id !== id));

const getDanhSachGheDangDat = (showtimeId) =>
  danhSachGheDangDat.filter((seat) => seat.idShowtime === showtimeId);

module.exports = {
  getDanhSachGheDangDat,
  addSeat,
  removeSeat,
};
