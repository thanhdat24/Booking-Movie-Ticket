import React, { memo } from "react";

import { customScrollbar, underLine } from "../../../../styles/materialUi";
import { useStyles } from "./styles";

function ListMovie(props) {
  const classes = useStyles({ customScrollbar, underLine });
  console.log("props.listMovie", props.listMovie);
  return (
    <div className={classes.lstPhim} hidden={props.hidden}>
      {/* div root danh sách phim */}
      {props.listMovie?.map((movie) => (
        <div className={classes.phim} key={movie?.idMovie._id}>
          <div className={classes.phim__info}>
            {/* div thong tin phim */}
            <img
              src={movie?.idMovie.photo}
              className={classes.phim__img}
              alt={movie?.idMovie.name}
            />
            <div className={classes.phim__text}>
              <p className={classes.phim__text_name}>{movie?.idMovie.name}</p>
              {/* <ThoiLuongDanhGia maPhim={phim.maPhim} /> */}
              {/* phải tách riêng ra vì thời lượng và đánh giá lấy từ một api khác */}
            </div>
          </div>
          <div>
            {/* div danh sách ngày giờ chiếu */}
            {/* <LstNgayChieu lstLichChieuTheoPhim={phim.lstLichChieuTheoPhim} /> */}
          </div>
        </div>
      ))}
    </div>
  );
}
export default memo(ListMovie);
