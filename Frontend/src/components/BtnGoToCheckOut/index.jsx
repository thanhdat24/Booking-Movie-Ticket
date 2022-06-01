import React from "react";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import moment from "moment";
export default function BtnGoToCheckout({ movieShowtimes }) {
  const classes = useStyles();
  const history = useHistory();
  
  const formatDateShow = new Date(movieShowtimes.dateShow)
    .toLocaleTimeString([], { hour12: false })
    .slice(0, 5);

  const calculateTimeout = (dateShow) => {
    const fakeThoiLuong = 120;
    const timeInObj = new Date(dateShow);
    const timeOutObj = new Date(
      timeInObj.getTime() + fakeThoiLuong * 60 * 1000
    );

    return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
  };

  return (
    <button
      className={classes.button}
      onClick={() =>
        history.push(
          `/booking-tickets/${movieShowtimes._id}`,
          `/booking-tickets/${movieShowtimes._id}`
        )
      }
    >
      <span className={classes.inTime}>{formatDateShow}</span>
      <span className={classes.outTime}>{` ~ ${calculateTimeout(
        movieShowtimes.dateShow
      )}`}</span>
    </button>
  );
}
