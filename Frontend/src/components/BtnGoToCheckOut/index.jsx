import React from "react";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
export default function BtnGoToCheckout({ movieShowtimes }) {
  const { currentUser } = useSelector((state) => state.AuthReducer);
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
    <button className={classes.button}>
      <span className={classes.inTime}>
        {movieShowtimes.dateShow.slice(11, 16)}
      </span>
      <span className={classes.outTime}>{` ~ ${calculateTimeout(
        movieShowtimes.dateShow
      )}`}</span>
    </button>
  );
}
