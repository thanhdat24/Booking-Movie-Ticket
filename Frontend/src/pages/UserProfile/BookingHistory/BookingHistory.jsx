import React from "react";
import { useSelector } from "react-redux";


export default function BookingHistory() {
      const {
        successGetDetailUser,
      } = useSelector((state) => state.AuthReducer);


  // lấy id ghế để render ra nhiều ghê
  const getIdSeat = (danhSachGhe) => {
    return danhSachGhe
      .reduce((listSeat, seat) => {
        return [...listSeat, seat.name];
      }, [])
      .join(", ");
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr className="whitespace-nowrap">
            <th scope="col">Stt</th>
            <th scope="col">Tên phim</th>
            <th scope="col">Thời lượng phim</th>
            <th scope="col">Ngày đặt</th>
            <th scope="col">Tên Rạp</th>
            {/* <th scope="col">Mã vé</th> */}
            <th scope="col">Tên ghế</th>
            <th scope="col">Giá vé(vnđ)</th>
            <th scope="col">Tổng tiền(vnđ)</th>
          </tr>
        </thead>
        <tbody>
          {successGetDetailUser?.bookingHistory
            ?.map((user, index) => (
              <tr key={user._id} className="whitespace-nowrap">
                <th scope="row">{index + 1}</th>
                <td>{user.idShowtime.idMovie.name}</td>
                <td>{user.idShowtime.idMovie.duration}</td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString()},{" "}
                  {new Date(user.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{user.idShowtime.idTheaterCluster.name}</td>
                {/* <td>{user.maVe}</td> */}
                <td>{getIdSeat(user.seatList)}</td>
                <td>
                  {new Intl.NumberFormat("it-IT", {
                    style: "decimal",
                  }).format(user.price)}
                </td>
                <td>
                  {new Intl.NumberFormat("it-IT", {
                    style: "decimal",
                  }).format(user.totalPrice)}
                </td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </div>
  );
}
