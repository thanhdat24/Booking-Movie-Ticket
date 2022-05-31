import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  Rating,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import PropTypes from "prop-types";
import formatDate from "../../../utils/formatDate";
// import LichChieu from "./LichChieu";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { scroller } from "react-scroll";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useEffect } from "react";
import moment from "moment";
import LichChieu from "./LichChieu";
// bình luận bao nhiêu giấy trước
// import "moment/locale/vi";
// moment.locale("vi");

function TabPanel(props) {
  const { isMobile, children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      <Box p={index === 0 ? 0 : 3}>{children}</Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default function CenteredTabs({
  data,
  onClickBtnMuave,
  isMobile,
  onIncreaseQuantityComment,
}) {
  const [commentListDisplay, setCommentListDisplay] = useState({
    comment: [],
    page: 5,
    hideBtn: false,
    idScrollTo: "",
  });
  console.log("commentListDisplay", commentListDisplay);
  const classes = useStyles({ hideBtn: commentListDisplay.hideBtn, isMobile });
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useHistory();
  const [hover, setHover] = React.useState(-1);
  const [valueTab, setValueTab] = useState(0);
  const [openComment, setOpenComment] = useState(false);
  const [warningtext, setwarningtext] = useState(false);
  const [dataComment, setdataComment] = useState({ post: "", point: 0.5 });

  // console.log("data1",data1)
  const { currentUser } = useSelector((state) => state.AuthReducer);
  console.log("currentUser", currentUser);
  const labels = {
    0.5: "0.5",
    1: "1",
    1.5: "1.5",
    2: "2",
    2.5: "2.5",
    3: "3",
    3.5: "3.5",
    4: "4",
    4.5: "4.5",
    5: "5",
  };

  function getLabelText(value) {
    return `${dataComment.point} Star${value !== 1 ? "s" : ""}, ${
      labels[value]
    }`;
  }
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handletyping = (event) => {
    if (event.target.value.length >= 10) {
      // nếu comment quá ngắn
      setwarningtext(false);
    }

    setdataComment((data) => ({ ...data, post: event.target.value }));
  };
  useEffect(() => {
    if (commentListDisplay.idScrollTo) {
      scroller.scrollTo(commentListDisplay.idScrollTo, {
        duration: 800,
        offset: -79,
        smooth: "easeInOutQuart",
      });
    }
  }, [commentListDisplay.idScrollTo]);

  const isLogin = () => {
    if (!currentUser) {
      // nếu chưa đăng nhập
      Swal.fire({
        title: "Bạn cần phải đăng nhập",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Không",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login", location.pathname);
        }
      });
    }
  };

  const handleClose = () => {
    setOpenComment(false);
  };
  const handleClickComment = () => {
    if (!currentUser) {
      isLogin();
      return;
    }
    setOpenComment(true);
    setwarningtext(false);
  };
  return (
    <div className={classes.root} id="lichchieu">
      <AppBar
        position="static"
        color="default"
        classes={{ root: classes.appBarRoot }}
      >
        <Tabs
          value={valueTab}
          onChange={handleChange}
          centered
          classes={{ indicator: classes.indicator }}
        >
          {(!location.state?.comingMovie ? true : "") && (
            <Tab
              disableRipple
              label="Lịch Chiếu"
              classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
            />
          )}
          <Tab
            disableRipple
            label="Thông Tin"
            classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
          />
          <Tab
            disableRipple
            label="Đánh Giá"
            classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
          />
        </Tabs>
      </AppBar>
      {/* <Fade timeout={400} in={0}> */}
      <TabPanel value={valueTab} index={0}>
        {<LichChieu data={data} />}
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <div className={`row text-white ${classes.detailMovie}`}>
          <div className="col-sm-6 col-xs-12">
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>
                Ngày công chiếu
              </p>
              <p className={`float-left ${classes.contentInfo}`}>
                {formatDate(data?.releaseDate?.slice(0, 10)).YyMmDd}
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Đạo diễn</p>
              <p className={`float-left ${classes.contentInfo}`}>
                {" "}
                Adam Wingard{" "}
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Diễn viên</p>
              <p className={`float-left ${classes.contentInfo}`}>
                Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Thể Loại</p>
              <p className={`float-left ${classes.contentInfo}`}>
                {data?.genre}
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Định dạng</p>
              <p className={`float-left ${classes.contentInfo}`}>
                {`${data ? data?.idTheater[0].type : ""}/Digital`}{" "}
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>
                Quốc Gia SX
              </p>
              <p className={`float-left ${classes.contentInfo}`}>Mỹ</p>
            </div>
          </div>
          <div className="col-sm-6 col-xs-12">
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Nội dung</p>
            </div>
            <div className="row mb-2">
              <p>{data?.description}</p>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={valueTab} index={2} className={classes.noname}>
        <div className={classes.danhGia}>
          <div className={classes.inputRoot} onClick={handleClickComment}>
            <span className={classes.avatarReviewer}>
              <img
                src={currentUser?.user.photo}
                alt="avatar"
                className={classes.avatarImg}
              />
            </span>
            <input
              className={classes.inputReviwer}
              type="text"
              placeholder="Bạn nghĩ gì về phim này?"
              readOnly="readonly"
            />

            <span className={classes.imgReviewerStar}>
              <Rating value={5} size={"medium"} readOnly precision={0.5} />
            </span>
          </div>
        </div>
      </TabPanel>

      <Dialog
        open={openComment}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className={classes.dialog} //lay tat ca comment ra
      >
        <DialogTitle disableTypography className={classes.rootcloseButton}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Grid container direction="column" justify="center" alignItems="center">
          {dataComment.point !== null && (
            <span className={classes.pointPopup}>
              {labels[hover !== -1 ? hover : dataComment.point]}
            </span>
          )}
          <Rating
            name="customStar"
            size="large"
            precision={0.5}
            value={dataComment.point}
            className={classes.starPopup}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(event, newValue) => {
              setdataComment((data) => ({ ...data, point: newValue }));
            }}
            getLabelText={getLabelText}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
        </Grid>
        <DialogContent className={classes.dialogContent}>
          <TextField
            className={classes.textField}
            onChange={(event) => handletyping(event)}
            fullWidth
            value={dataComment.post}
            variant="outlined"
            label={
              dataComment.post
                ? ""
                : "Nói cho mọi người biết bạn nghĩ gì về phim này..."
            }
          />
        </DialogContent>
        <DialogActions className="justify-content-center flex-column px-4">
          {warningtext && (
            <DialogContentText className="text-danger">
              Phim đem đến cảm xúc tuyệt vời cho bạn chứ? Chia sẻ thêm nữa đi
              bạn ơi và nhớ gõ trên 10 kí tự nhé.
            </DialogContentText>
          )}
          <Button
            // onClick={handlePostComment}
            variant="contained"
            className={classes.btnDang}
          >
            Đăng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
