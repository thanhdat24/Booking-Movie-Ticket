import React from "react";
import { colorTheater } from "../../../constants/theaterData";

import { useSelector } from "react-redux";

import useStyles from "./style";
import formatDate from "../../../utils/formatDate";

export default function SuccessBooking() {
  const {
    amount,
    email,
    phone,
    discount,
    paymentMethod,
    danhSachPhongVe: { data },
    listSeatSelected,
    successBookingTicket,
    errorBookTicket,
  } = useSelector((state) => state.BookTicketReducer);
  const { currentUser } = useSelector((state) => state.AuthReducer);
  console.log("data456", data);
  const classes = useStyles({
    data,
    color: colorTheater[data?.theaterClusterName.slice(0, 3).toUpperCase()],
  });
  const calculateTimeout = (dateShow) => {
    const fakeThoiLuong = 120;
    const timeInObj = new Date(dateShow);
    const timeOutObj = new Date(
      timeInObj.getTime() + fakeThoiLuong * 60 * 1000
    );

    return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
  };
  return (
    <div className={classes.resultBookticket}>
      <div className={classes.infoTicked}>
        <div className={classes.infoTicked__img}></div>
        <div className={classes.infoTicked__txt}>
          <p className={classes.tenPhim}>{data?.movieName}</p>
          <p className={classes.text__first}>
            <span>{data?.theaterClusterName.split("-")[0]}</span>
            <span className={classes.text__second}>
              -{data?.theaterClusterName.split("-")[1]}
            </span>
          </p>
          <p className={classes.diaChi}>{data?.address}</p>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td valign="top">Suất chiếu:</td>
                <td valign="top">{`${calculateTimeout(data?.dateShow)} ${
                  formatDate(data?.dateShow).dDMmYy
                }`}</td>
              </tr>
              <tr>
                <td valign="top">Phòng chiếu:</td>
                <td>{data?.theaterName}</td>
              </tr>
              <tr>
                <td valign="top">Ghế:</td>
                <td>{listSeatSelected?.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          <h3 className={classes.infoResult_label}>Thông tin đặt vé</h3>
          <table className={`${classes.table} table`}>
            <tbody>
              <tr>
                <td valign="top">Họ tên:</td>
                <td>{currentUser?.user.fullName}</td>
              </tr>
              <tr>
                <td valign="top">Điện thoại:</td>
                <td valign="top">{phone}</td>
              </tr>
              <tr>
                <td valign="top">Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td valign="top">Trạng thái:</td>
                <td>
                  {successBookingTicket && (
                    <span>
                      Đặt vé thành công qua{" "}
                      <span className={classes.paymentColor}>
                        {paymentMethod}
                      </span>
                    </span>
                  )}
                  {errorBookTicket && (
                    <span>
                      Đặt vé thất bại:{" "}
                      <span className={classes.errorColor}>
                        {errorBookTicket}
                      </span>
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td valign="top">Khuyến mãi:</td>
                <td valign="top"><b>{`${(discount*1).toLocaleString("vi-VI")} đ`}</b></td>
              </tr>
              <tr>
                <td valign="top">Tổng tiền:</td>
                <td valign="top">
                  <span className="text-lg">
                    <b>{`${(amount - discount).toLocaleString("vi-VI")} đ`}</b>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {successBookingTicket && (
            <p className={classes.noteresult}>
              Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
