import React, { useState } from "react";
import { CircularProgress, Rating } from "@mui/material";

import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useStyles } from "./styles";
import BtnPlay from "../../../components/BtnPlay";
import { useSelector } from "react-redux";
import formatDate from "../../../utils/formatDate";
import { scroller } from "react-scroll";
import Tap from "../Tap";

export default function MovieItem({ successDetailMovie: data }) {
  console.log("data", data);
  console.log("data.photo", data?.photo);
  const [onClickBtnMuave, setOnClickBtnMuave] = useState(0);
  const param = useParams();
  const headMenu = [{ nameLink: "Mua vé", id: "lichchieu" }];
  // console.log("location.pathname", location.pathname);
  const handleClickLink = (id) => {
    // setOpenDrawer(false)

    scroller.scrollTo(id, {
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };
  const classes = useStyles({ bannerImg: data?.photo });
  const [imageNotFound, setImageNotFound] = useState(false);
  let location = useLocation();

  const handleBtnMuaVe = () => {
    setOnClickBtnMuave(Date.now());
  };

  return (
    <div className={classes.desktop}>
      <div className={classes.top}>
        <div className={classes.gradient}></div>
        <div className={classes.bannerBlur}>
          {imageNotFound && <div className={classes.withOutImage}></div>}
        </div>
        <div className={classes.topInfo}>
          <div className={classes.imgTrailer}>
            <BtnPlay urlYoutube={data?.trailer} />
            {/* xử lý khi url hình bị lỗi */}
            <img
              src={data?.photo}
              alt="poster"
              style={{ display: "none" }}
              onError={(e) => {
                e.target.onerror = null;
                setImageNotFound(true);
              }}
            />
            {imageNotFound && <div className={classes.withOutImage}></div>}
          </div>
          <div className={classes.shortInfo}>
            <p>{formatDate(data?.releaseDate?.slice(0, 10)).YyMmDd}</p>

            <p className={classes.movieName}>
              <span className={classes.c18}>C18</span>
              {data?.name}
            </p>
            {/* <p>{`${thoiLuong ?? "120"} phút - ${danhGia} Tix`} - 2D/Digital</p> */}
            <p>
              {`${data?.duration ?? "120"} phút - ${
                data ? data?.idTheater[0]?.type : ""
              }/Digital`}{" "}
            </p>
            <button className={classes.btnMuaVe} onClick={handleBtnMuaVe}>
              {location.state?.comingMovie ? "Thông tin phim" : "Mua vé"}
            </button>
          </div>
          <div className={classes.rate}>
            <div className={classes.circular}>
              <span className={classes.danhGia}>{10}</span>
              <CircularProgress
                variant="determinate"
                size="100%"
                value={100}
                className={classes.behined}
                color="secondary"
              />
              <CircularProgress
                variant="determinate"
                size="100%"
                value={10 * 10}
                className={classes.fabProgress}
                color="secondary"
              />
            </div>
            <div className={classes.rateStar}>
              <Rating value={(10 * 5) / 10} precision={0.5} readOnly />
            </div>
            <span>{10} người đánh giá</span>
          </div>
        </div>
      </div>
      <Tap
        data={data}
        onClickBtnMuave={onClickBtnMuave}
        // onIncreaseQuantityComment={onIncreaseQuantityComment}
      />
    </div>
  );
}
