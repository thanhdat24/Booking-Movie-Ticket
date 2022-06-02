import { makeStyles } from "@mui/styles";
import { customScrollbar } from "../../../styles/materialUi";

const useStyles = makeStyles({
  listSeat: (props) => ({
    position: "relative !important",
    padding: props.isMobile ? "0px" : "0 10%",
    marginLeft: props.isMobile ? "0%" : "10%",
  }),

  info_CountDown: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: (props) => (props.isMobile ? "15px 15px 0px" : "2% 0%"),
  },
  infoTheater: {
    display: "flex",
  },
  text: {
    paddingTop: 5,
    paddingLeft: 13,
  },
  textTime: {
    color: "#9b9b9b",
    fontSize: 13,
  },
  countDown: {
    textAlign: "center",
  },
  timeTitle: {
    fontSize: "12px",
    color: "#9b9b9b",
  },
  timeCount: {
    fontWeight: 500,
    fontSize: 34,
    color: "#fb4226",
    lineHeight: "39px",
  },
  text__first: (props) => ({
    color: props.color ? `${props.color}` : "#000",
    fontWeight: "500",
    fontSize: props.testSize ? props.testSize : 14,
  }),
  text__second: {
    color: "#000",
    fontWeight: "500",
  },
  overflowSeat: {
    overflow: (props) => (props.isMobile ? "auto hidden" : "auto hidden"),
    ...customScrollbar,
  },
  invariantWidth: {
    minWidth: (props) => (props.isMobile ? "600px" : "600px"),
    padding: (props) => (props.isMobile ? "0 7%" : "0%"),
  },
  screen: {
    width: "100%",
  },
  seatSelect: {
    padding: "0% 8%",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  seat: {
    position: "relative !important",
    width: "calc(100%/16)",
    display: "inline-block",
    cursor: "pointer",
  },
  label: {
    position: "absolute",
    top: "50%",
    left: "-100%",
    transform: "translate(-50%, -50%)",
    fontWeight: 600,
    fontSize: (props) => props.widthLabel,
    cursor: "default",
  },
  seatName: {
    position: "absolute",
    top: "49%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    fontSize: (props) => props.widthLabel,
  },
  seatLocked: {
    position: "absolute",
    top: "49%",
    left: "50%",
    width: "41%",
    transform: "translate(-50%, -50%)",
  },
  seatIcon: {
    width: "110% !important",
    height: "100% !important",
  },
  viewCenter: {
    position: "absolute",
    top: "68%",
    left: "47.5%",
    maxWidth: "700%",
    height: "350%",
    transform: "translate(-42.5%,-42%)",
    zIndex: 1,
    opacity: 0.8,
  },
  areaClick: {
    width: "100%",
    height: "100%",
    color: "red",
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
  },

  noteSeat: {
    padding: "2% 10% 0",
    fontSize: 13,
    color: "#9b9b9b",
  },
  typeSeats: {
    display: "flex",
    justifyContent: "space-evenly",
    textAlign: "center",
    gap: "2px",
  },
  posiX: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 18,
    color: "#fff",
  },

  positionView: {
    textAlign: "center",
    marginTop: 5,
    paddingBottom: 20,
  },
  line: {
    marginLeft: 19,
  },
  linecenter: {
    display: "inline-block",
    borderBottom: "2px dashed #fa7f6c",
    width: 28,
    verticalAlign: "super",
    marginRight: 8,
  },
  linebeautiful: {
    display: "inline-block",
    borderBottom: "2px solid #fa7f6c",
    width: 28,
    verticalAlign: "super",
    marginRight: 8,
  },

  modalleft: (props) => ({
    display: props.isMobile ? "none" : "block",
    left: 0,
    top: 100,
    height: "calc(100% - 100px)",
    width: "7.5%",
    position: "fixed",
    backgroundImage: `url(${props.modalLeftImg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }),

  opacity: {
    height: "100%",
    width: "100%",
    background: "#000",
    opacity: 0.7,
  },
});
export default useStyles;
