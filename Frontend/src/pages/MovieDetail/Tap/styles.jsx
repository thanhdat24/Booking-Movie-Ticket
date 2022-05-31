import { makeStyles } from "@mui/styles";
import { customScrollbar } from "../../../styles/materialUi";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100% !important",
    maxWidth: 870,
    margin: "auto !important",
  },
  appBarRoot: {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  indicator: {
    backgroundColor: "transparent !important",
  },
  tapRoot: {
    color: "#fff !important",
    opacity: "1 !important",
    fontSize: "16px !important",
    textTransform: "uppercase !important",
    margin: "0px 15px !important",

    "&:hover": {
      fontSize: "18px !important",
    },
    transition: "all .2s !important",
  },
  selectedTap: {
    color: "#fb4226 !important",
    fontSize: "18px !important",
  },
  noname: {
    "& .MuiBox-root": {
      paddingTop: (props) => (props.isMobile ? 0 : 24),
    },
  },
  detailMovie: {
    fontSize: 14,
  },
  contentTitle: {
    width: "30%",
    fontWeight: 500,
    fontSize: 15,
  },
  contentInfo: {
    width: "70%",
    paddingLeft: 10,
  },

  movieDetail: {
    color: "#e9e9e9",
  },
  danhGia: {
    marginBottom: 15,
  },
  inputRoot: {
    maxWidth: "580px",
    margin: "auto",
    padding: "0",
    position: "relative",
    cursor: "pointer",
    width: "100%",
  },
  avatarReviewer: {
    position: "absolute",
    top: "20%",
    left: "3%",
  },
  avatar: {
    display: "inline-block",
    float: "left",
  },
  avatarImg: {
    height: "36px",
    width: "36px",
    borderRadius: "25px",
  },
  inputReviwer: {
    cursor: "pointer",
    padding: "10px 10px 10px 60px",
    width: "100%",
    height: "60px",
    borderRadius: "4px",
    border: "1px solid #e8e8e9",
    background: "#fff",
    color: "#9b9b9b",
    fontSize: "14px",
    "&:focus": {
      outline: "none",
    },
  },
  imgReviewerStar: {
    position: "absolute",
    top: "50%",
    right: "3%",
    transform: "translateY(-50%) ",
    display: "flex",
    margin: "auto",
  },

  itemDis: {
    padding: "20px 20px 12px",
    border: "1px solid #e6e6e6",
    borderBottom: "none",
    borderRadius: "3px",
    backgroundColor: "#fff",
    maxWidth: "580px",
    width: "100%",
    margin: "auto",
    color: "#4a4a4a",
    marginBottom: 15,
  },
  infoUser: {},
  liveUser: {
    marginLeft: 10,
    display: "inline-block",
  },
  userName: {
    color: "#000",
    fontWeight: 500,
    fontSize: 14,
    // textTransform: "capitalize",
  },
  timePost: {
    color: "#9b9b9b",
    fontSize: 12,
  },

  left: {
    float: "left",
  },
  right: {
    textAlign: "center",
    float: "right",
  },
  btnDang: {
    backgroundColor: "#fb4226 !important",
    borderColor: "#fb4226 !important",
    color: "#fff !important",
    padding: "7px 25px !important",
    margin: "0px 0px 7px 0px !important",
    "&:hover": {
      backgroundColor: "#fb4226 !important",
      borderColor: "#fb4226 !important",
    },
  },
  dialogContent: {
    minHeight: (props) => (props.isMobile ? 70 : 95),
  },
  textField: {
    "& .MuiInputLabel-root": {
      transform: "translate(18px, 29px) scale(1)",
      color: "#4a4a4a",
      right: 18,
      top: (props) => (props.isMobile ? -15 : 0),
    },
    "& label.Mui-focused": {
      display: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "purple",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        top: 0,
        "& legend": {
          display: "none",
        },
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fb4226",
        boxShadow:
          "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(251 66 38 / 60%)",
        borderWidth: 1,
      },
      "& input": {
        padding: (props) => (props.isMobile ? "20px 20px" : "30px 20px"),
      },
    },
  },
  starPopup: {
    fontSize: (props) => (props.isMobile ? 27 : 40),
  },
  pointPopup: {
    color: "#7ed321",
    fontSize: (props) => (props.isMobile ? 27 : 40),
  },
  dialog: {
    "& .MuiDialog-container": {
      "& .MuiPaper-root": {
        ...customScrollbar,
      },
    },
  },
  rootcloseButton: {
    margin: "0 !important",
    padding: "0 !important",
  },
  closeButton: {
    position: "absolute !important",
    right: `${theme.spacing(1)} !important`,
    top: `${theme.spacing(1)} !important`,
    color: `${theme.palette.grey[500]} !important`,
  },

  moreMovie: {
    margin: "30px auto",
    textAlign: "center",
    display: (props) => (props.hideBtn ? "none" : "block"),
  },
  moreMovieButton: {
    color: "#949494 !important",
    borderColor: "#949494 !important",
    padding: "7px 25px !important",
    backgroundColor: "transparent !important",
    "&:hover": {
      backgroundColor: "#fb4226 !important",
      borderColor: "#fb4226 !important",
      color: "#fff !important",
    },
    "@media (hover: none)": {
      "&:hover": {
        color: "#949494",
        borderColor: "#949494",
        backgroundColor: "transparent",
      },
    },
  },
}));

export default useStyles;
