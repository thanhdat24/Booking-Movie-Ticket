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
import { selectCommentByMaPhimAndCommentTest } from "../../../redux/selector/MovieDetail";

export default function MovieItem({ successDetailMovie: data }) {
  const params = useParams();
  const [onClickBtnMuave, setOnClickBtnMuave] = useState(0);
  const [quantityComment, setQuantityComment] = useState(0);
  const { commentList } = useSelector((state) =>
    selectCommentByMaPhimAndCommentTest(state, params.idMovie)
  );
  const onIncreaseQuantityComment = (value) => {
    setQuantityComment(value);
  };
  const classes = useStyles({ bannerImg: data?.photo });
  const [imageNotFound, setImageNotFound] = useState(false);
  let location = useLocation();
  const totalReviewer = commentList?.length;
  // reduce tính tổng
  const totalReview = commentList?.reduce((total, item) => {
    return total + item.rating;
  }, 0);
  const ratingMovie = totalReview / totalReviewer;
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
            {data?.idTheater ? (
              <p>
                {`${data?.duration ?? "120"} phút - ${
                  data ? data?.idTheater[0]?.type : ""
                }/Digital`}{" "}
              </p>
            ) : (
              <p>
                {`${data?.duration ?? "120"} phút -  2D/Digital
                `}
              </p>
            )}

            <button className={classes.btnMuaVe} onClick={handleBtnMuaVe}>
              {location.state?.comingMovie ? "Thông tin phim" : "Mua vé"}
            </button>
          </div>
          <div className={classes.rate}>
            <div className={classes.circular}>
              <span className={classes.danhGia}>
                {" "}
                {ratingMovie ? ratingMovie.toFixed(1) : 0}{" "}
              </span>
              <CircularProgress
                variant="determinate"
                size="100%"
                value={100}
                className={classes.behined}
                 color="success" 
              />
              <CircularProgress
                variant="determinate"
                size="100%"
                value={10 * 10}
                className={classes.fabProgress}
                 color="success" 
              />
            </div>
            <div className={classes.rateStar}>
              <Rating value={ratingMovie.toFixed(1)} precision={0.5} readOnly />
            </div>
            <span>{quantityComment} người đánh giá</span>
          </div>
        </div>
      </div>
      <Tap
        data={data}
        onClickBtnMuave={onClickBtnMuave}
        onIncreaseQuantityComment={onIncreaseQuantityComment}
      />
    </div>
  );
}
