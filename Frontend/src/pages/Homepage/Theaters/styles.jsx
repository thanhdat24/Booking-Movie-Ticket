import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  theater: {
    display: (props) => (props.isMobileTheater ? "block" : "flex"),
    maxWidth: 940,
    maxHeight: 705,
    margin: "auto",
    border: "1px solid #ebebec",
    borderRadius: 4,
  },
  taps: {
    // dường line phần chia khs horizontal
    borderBottom: "none",
    minWidth: 92,
  },
  cumRap: {
    minWidth: "calc(100% - 92px)",
  },
  tabs__indicator: {
    backgroundColor: "transparent !important",
  },
  tap: (props) => ({
    padding: 20,
    minWidth: 92,
    margin: "auto",
    ...props.underLine,
  }),
  textColorInherit: {
    opacity: "0.3 !important",
    "&:hover": {
      transition: "all .2s",
      opacity: "1 !important",
    },
  },
});
export { useStyles };
