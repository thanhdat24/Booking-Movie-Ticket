import React from "react";
import { underLine } from "../../../styles/materialUi";
import Seperate from "../../../components/Seperate";


import { useSelector } from "react-redux";
import { useStyles } from "./styles";
import { Tab, Tabs } from "@mui/material";
import { colorTheater } from "../../../constants/theaterData";
import ListTheaterCluster from "./ListTheaterCluster";


export default function Theaters() {
  const [valueTheaterSystem, setValueTheaterSystem] = React.useState(0);
  const classes = useStyles({ underLine });
  const {
    loadingTheaterSystemList,
    errorTheaterSystemList,
    theaterSystemList,
  } = useSelector((state) => state.TheaterSystemReducer);
  console.log("theaterSystemList", theaterSystemList);
  if (errorTheaterSystemList) {
    return <div>{errorTheaterSystemList}</div>;
  }
  return (
    <div id="cumrap">
      <Seperate />
      <div className={classes.theater}>
        <Tabs
          variant={"standard"}
          scrollButtons="on"
          orientation={"vertical"}
          value={valueTheaterSystem}
          classes={{ indicator: classes.tabs__indicator, root: classes.taps }}
        >
          {theaterSystemList?.data?.map((theater, index) => (
            <Tab
              onClick={() => setValueTheaterSystem(index)}
              disableRipple
              classes={{
                root: classes.tap,
                textColorInherit: classes.textColorInherit,
              }}
              key={theater._id}
              label={
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={theater.logo}
                  alt="theaterLogo"
                />
              }
            />
          ))}
        </Tabs>
        {theaterSystemList?.data?.map((theater, index2) => (
          <div
            hidden={valueTheaterSystem !== index2}
            key={theater?._id}
            className={classes.cumRap}
          >
            <ListTheaterCluster
              listTheaterCluster={theater.theatersystem}
              color={
                colorTheater[
                  theater?.theatersystem[0]?.idTheaterCluster.name
                    .slice(0, 3)
                    .toUpperCase()
                ]
              }
              idTheaterSystem={theater._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
