import React from "react";

import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { OPEN_MODAL } from "../../redux/constants/ModalTrailer";

const play = "/img/carousel/play-video.png";

BtnPlay.propTypes = {
  urlYoutube: PropTypes.string,
  cssRoot: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

const useStyles = makeStyles({
  button: {
    position: "absolute !important",
    top: "50% ",
    left: "50%",
    transform: "translate(-50%,-50%)",

    zIndex: "1000 !important",
    opacity: 0,
    background: "0 0",
    border: "none",

    height: (props) => (props.width ? props.width : 70),
    width: (props) => (props.height ? props.height : 70),
    transition: "all .2s",
  },
  imgPlay: {
    height: "100%",
    width: "100%",
    transition: "all .2s",
    cursor: "pointer",
    "&:hover": { opacity: "1 !important" },
  },
});

export default function BtnPlay({ cssRoot, width, height, urlYoutube }) {
  const classes = useStyles({ width, height });

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        open: true,
        urlYoutube,
      },
    });
  };

  return (
    <div className={`${classes.button} ${cssRoot}`}>
      <img
        src={play}
        className={classes.imgPlay}
        onClick={() => openModal()}
        alt="play"
      />
    </div>
  );
}
