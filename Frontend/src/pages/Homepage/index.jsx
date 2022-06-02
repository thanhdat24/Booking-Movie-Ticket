import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMovieList } from "../../redux/actions/Movie";
import { getTheaterList } from "../../redux/actions/Theater";
import Carousel from "./Carousel";
import Showtime from "./Showtime";

export default function Homepage() {
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.MovieReducer);

  const { theaterList } = useSelector((state) => state.TheaterReducer);

  useEffect(() => {
    if (!movieList?.result) {
      dispatch(getMovieList());
    }
    if (!theaterList?.result) {
      dispatch(getTheaterList());
    }
  }, []);

  return (
    <div>
      <Carousel />
      <Showtime />
    </div>
  );
}
