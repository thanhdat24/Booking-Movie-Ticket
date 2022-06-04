import React, { memo } from "react";

import { underLine, customScrollbar } from "../../../../styles/materialUi";
import ListMovie from "../ListMovie";
import { useStyles } from "./styles";

function ListTheaterCluster(props) {
  const { listTheaterCluster, color } = props;
  const [valueTheaterCluster, setValueTheaterCluster] = React.useState(0);
  const classes = useStyles({ underLine, customScrollbar, color });
  console.log("listTheaterCluster", listTheaterCluster);
  const handleChangeTheaterCluster = (e) => {
    setValueTheaterCluster(Number(e.currentTarget.getAttribute("index")));
  };
  return (
    <div className={classes.flexCumRap}>
      <div className={classes.lstCumRap}>
        {listTheaterCluster.map((theaterCluster, index) => (
          <div
            className={classes.cumRap}
            index={index}
            onClick={(e) => handleChangeTheaterCluster(e)}
            key={theaterCluster.idTheaterCluster._id}
            style={{ opacity: valueTheaterCluster === index ? "1" : ".5" }}
          >
            <img
              className={classes.cumRap__img}
              src={theaterCluster.idTheaterCluster.photo}
              alt="theater"
            />

            <div className={classes.cumRap__info}>
              <p className={classes.text__first}>
                <span>
                  {theaterCluster?.idTheaterCluster.name?.split("-")[0]}
                </span>
                <span className={classes.text__second}>
                  -{theaterCluster?.idTheaterCluster.name?.split("-")[1]}
                </span>
              </p>
              <p className={classes.cumRap__address}>
                {theaterCluster?.idTheaterCluster?.address}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* {listTheaterCluster?.theatersystem?.map((theaterCluster, index) => (
        <ListMovie
          listMovie={theaterCluster}
          key={theaterCluster.idTheaterCluster._id}
          hidden={valueTheaterCluster !== index}
        />
      ))} */}
    </div>
  );
}
export default memo(ListTheaterCluster);
