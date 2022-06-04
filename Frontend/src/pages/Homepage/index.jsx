import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMovieList } from "../../redux/actions/Movie";
import Carousel from "./Carousel";
import Showtime from "./Showtime";
import Theaters from "./Theaters";
import { getTheaterSystemList } from "../../redux/actions/TheaterSystem";

export default function Homepage() {
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.MovieReducer);

  const { theaterSystemList } = useSelector(
    (state) => state.TheaterSystemReducer
  );

  useEffect(() => {
    if (!movieList?.result) {
      dispatch(getMovieList());
    }
    if (!theaterSystemList?.result) {
      dispatch(getTheaterSystemList());
    }
  }, []);

  return (
    <div>
      <Carousel />
      <Showtime />
      <Theaters />
    </div>
  );
}
