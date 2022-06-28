import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Desktop from "./Desktop/";
import Modal from "./Modal/";
import { useParams } from "react-router-dom";
import {
  getDetailShowtimes,
  getListSeat,
} from "../../redux/actions/BookTicket";
import {
  INIT_DATA,
  RESET_DATA_BOOKTICKET,
} from "../../redux/constants/BookTicket";
import { getDiscountsList } from "../../redux/actions/Discount";

export default function BookTickets(props) {
  const {
    danhSachPhongVe: { data },
    danhSachPhongVe,
    timeOut,
    refreshKey,
    errorGetListSeatMessage,
  } = useSelector((state) => state.BookTicketReducer);
  const { seatList } = danhSachPhongVe;
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const { user } = currentUser;
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiscountsList());
    dispatch(getListSeat(params.idShowtime));

    return () => {
      // xóa dữ liệu khi đóng hủy component
      dispatch({ type: RESET_DATA_BOOKTICKET });
    };
  }, []);

  useEffect(() => {
    // sau khi lấy được danhSachPhongVe thì khởi tạo data
    let initCode = 64;
    const danhSachGheEdit = seatList?.map((seat, i) => {
      // thêm label A01, thêm flag selected: false
      if (i % 16 === 0) initCode++;
      const txt = String.fromCharCode(initCode);
      const number = ((i % 16) + 1).toString().padStart(2, 0);
      return {
        ...seat,
        label: txt + number,
        selected: false,
        ticketPrice: data?.ticketPrice,
      };
    });
    dispatch({
      type: INIT_DATA,
      payload: {
        listSeat: danhSachGheEdit,
        idShowtime: data?.showtimeId,
        userName: user?.fullName,
        email: user?.email,
        phone: user?.phoneNumber,
      },
    });
  }, [seatList, currentUser, timeOut]);

  if (errorGetListSeatMessage) {
    return <div>{errorGetListSeatMessage}</div>;
  }
  return (
    <div>
      <Desktop key={refreshKey + 1} />
      <Modal {...props} />
    </div>
  );
}
