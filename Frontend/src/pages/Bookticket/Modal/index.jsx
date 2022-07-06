import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ResultBookticket from "../ResultBookticket";
import useStyles from "./style";
import { Button, Dialog } from "@mui/material";
import {
  getDetailShowtimes,
  getListSeat,
} from "../../../redux/actions/BookTicket";
import {
  RESET_ALERT_OVER10,
  RESET_DATA_BOOKTICKET,
} from "../../../redux/constants/BookTicket";
import { LOADING_BACKTO_HOME } from "../../../redux/constants/Lazy";

export default function Modal(props) {
  const {
    successBookingTicket,
    errorBookTicket,
    timeOut,
    alertOver10,
    danhSachPhongVe: { seatList },
    danhSachPhongVe,
  } = useSelector((state) => state.BookTicketReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const isBookTicket = successBookingTicket || errorBookTicket ? true : false;
  const handleReBooking = () => {
    if (successBookingTicket) {
      dispatch(getListSeat(params.idShowtime));
    }
    dispatch({ type: RESET_DATA_BOOKTICKET });
  };

  const handleTimeOut = () => {
    dispatch({ type: RESET_DATA_BOOKTICKET });
    dispatch(getListSeat(params.idShowtime));
  };
  const handleAlertOver10 = () => {
    dispatch({ type: RESET_ALERT_OVER10 });
  };

  const handleCombackHome = () => {
    dispatch({ type: RESET_DATA_BOOKTICKET });
    // dispatch({ type: LOADING_BACKTO_HOME });
    history.push("/");
  };

  return (
    <Dialog
      open={timeOut || isBookTicket || alertOver10}
      classes={{ paper: classes.modal }}
      maxWidth="md"
    >
      {timeOut &&
        !isBookTicket && ( // không thông báo hết giờ khi đã có kết quả đặt vé
          <div className={classes.padding}>
            <p>
              Đã hết thời gian giữ ghế. Vui lòng thực hiện đơn hàng trong thời
              hạn 5 phút.
              <span className={classes.txtClick} onClick={handleTimeOut}>
                Đặt vé lại
              </span>
            </p>
          </div>
        )}
      {alertOver10 &&
        !timeOut && ( // ẩn thông báo quá 10 ghế khi time out
          <div className={classes.over10}>
            <div className={classes.notification}>
              <img
                width="100%"
                src="/img/bookticket/Post-notification.png"
                alt="Post-notification"
              />
            </div>
            <p className={classes.textOver}>Bạn không thể chọn quá 10 ghế</p>
            <Button
              variant="outlined"
              classes={{ root: classes.btnOver }}
              onClick={handleAlertOver10}
            >
              ok
            </Button>
          </div>
        )}
      {isBookTicket && ( // chỉ open modal khi là desktop và đã đạt vé
        <>
          <ResultBookticket socket={props.socket} />
          <div className={classes.spaceEvenly}>
            <Button
              classes={{ root: classes.btnResult }}
              onClick={handleReBooking}
            >
              {successBookingTicket && "Mua thêm vé phim này"}
              {errorBookTicket && "Thử mua lại"}
            </Button>
            <Button
              classes={{ root: classes.btnResult }}
              onClick={handleCombackHome}
            >
              Quay về trang chủ
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}
