import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Stack,
  Grid,
  Card,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useHistory, useParams } from "react-router-dom";
import theatersApi from "../../api/theatersApi";
import { getMovieList, resetMoviesManagement } from "../../redux/actions/Movie";
import moment from "moment";
import {
  resetCreateShowtime,
  updateShowtime,
} from "../../redux/actions/BookTicket";
export default function Info() {
  const param = useParams();
  console.log("param", param.showtimeId);
  const {
    loadingCreateShowtime,
    loadingUpdateShowtime,
    successDetailShowtime,
    successUpdateShowtime,
    errorUpdateShowtime,
  } = useSelector((state) => state.BookTicketReducer);
  console.log("successDetailShowtime", successDetailShowtime);
  const dispatch = useDispatch();
  const history = useHistory();
  const { showtimeList } = useSelector((state) => state.BookTicketReducer);
  const { movieList } = useSelector((state) => state.MovieReducer);
  console.log("movieList", movieList);
  var formatDateShow = moment(successDetailShowtime?.dateShow)
    .add(0, "hours")
    .format("MM/DD/YYYY hh:mm A");
  const [selectedDate, setSelectedDate] = useState(formatDateShow);
  const { enqueueSnackbar } = useSnackbar();
  console.log(
    "dateShow",
    moment(successDetailShowtime?.dateShow)
      .add(0, "hours")
      .format("MM/DD/YYYY hh:mm A")
  );

  const [data, setData] = useState({
    setMovie: successDetailShowtime?.idMovie._id,
    theaterRender: [],
    setTheater: successDetailShowtime?.idTheater.name,
    dateShow: formatDateShow,
    setTicketPrice: successDetailShowtime?.ticketPrice,
    ticketPriceRender: [75000, 100000, 120000, 150000],
    startRequest: false, // lựa chọn giữa hiện thị "đang tìm" hay "không tìm thấy"
    openCtr: {
      movie: false,
      theater: false,
      dateShow: false,
      ticketPrice: false,
    },
  });
  const [isReadyCapNhatLichChieu, setIsReadyCapNhatLichChieu] = useState(false);

  useEffect(() => {
    if (data.setMovie && data.dateShow && data.idTheater && data.setTicketPrice)
      setIsReadyCapNhatLichChieu(true);
    else setIsReadyCapNhatLichChieu(false);
  }, [data.setMovie, data.dateShow, data.idTheater, data.setTicketPrice]);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
    >
      Lịch chiếu
    </Link>,
    <Typography key="3" color="text.primary">
      Lịch chiếu mới
    </Typography>,
  ];
  useEffect(() => {
    // get list user lần đầu
    if (!movieList.result) {
      dispatch(getMovieList());
    }
    return () => dispatch(resetMoviesManagement());
  }, []);

  const handleOpenMovie = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, movie: true } }));
  };
  const handleOpenTheater = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, theater: true },
    }));
  };

  const handleOpendateShow = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, dateShow: true },
    }));
  };
  const handleOpenTicketPrice = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ticketPrice: true },
    }));
  };
  const handleCloseMovie = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, movie: false },
    }));
  };
  const handleCloseTheater = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, theater: false },
    }));
  };
  const handleClosedateShow = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, dateShow: false },
    }));
  };
  const handleCloseTicketPrice = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ticketPrice: false },
    }));
  };

  const handleSelectMovie = (e) => {
    const isOpenTheater = data.setTheater ? false : true;
    setData((data) => ({
      ...data,
      setMovie: e.target.value,
      startRequest: true,
      openCtr: {
        ...data.openCtr,
        theater: isOpenTheater,
      },
    }));
    theatersApi.getTheaterList(e.target.value).then((result) => {
      setData((data) => ({
        ...data,
        theaterRender: result.data,
        startRequest: false,
      }));
    });
  };

  const handleSelectTheater = (e) => {
    const opendateShow = data.dateShow ? false : true;
    setData((data) => ({
      ...data,
      setTheater: e.target.value.name,
      startRequest: true,
      openCtr: { ...data.openCtr, dateShow: opendateShow },
      idTheater: e.target.value._id,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date !== "Invalid Date") {
      const obj = new Date(date);
      setData((data) => ({
        ...data,
        dateShow: `${(obj.getMonth() + 1).toString().padStart(2, 0)}/${obj
          .getDate()
          .toString()
          .padStart(2, 0)}/${obj.getFullYear()} ${obj
          .getHours()
          .toString()
          .padStart(2, 0)}:${obj.getMinutes().toString().padStart(2, 0)}:00`,
      }));
    }
  };
  const handleDateAccept = () => {
    const openTicketPrice = data.setTicketPrice ? false : true;
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ticketPrice: openTicketPrice },
    }));
  };

  const handleSelectTicketPrice = (e) => {
    setData((data) => ({
      ...data,
      setTicketPrice: e.target.value,
    }));
    console.log("data", data);
  };

  const handleCapNhatLichChieu = () => {
    // if (loadingCreateShowtime || !isReadyCapNhatLichChieu) {
    //   // khi đang gửi requet hoặc chưa sẵn sàng thì không cho dispatch
    //   return;
    // }
    dispatch(
      updateShowtime(param.showtimeId, {
        idMovie: data.setMovie,
        dateShow: data.dateShow,
        idTheater: data.idTheater,
        ticketPrice: data.setTicketPrice,
      }) // ngayChieuGioChieu phải có định dạng dd/MM/yyyy hh:mm:ss);
    );
  };

  useEffect(() => {
    if (successUpdateShowtime) {
      setTimeout(() => {
        history.push("/admin/showtimes/list");
      }, 100);
      setTimeout(() => {
        enqueueSnackbar("Cập nhật lịch chiếu thành công!", {
          variant: "success",
        });
      }, 150);
      return () => dispatch(resetCreateShowtime());
    }
    if (errorUpdateShowtime) {
      enqueueSnackbar(errorUpdateShowtime, { variant: "error" });
    }
  }, [successUpdateShowtime, errorUpdateShowtime]);
  return (
    <Container>
        <Fragment>
          <Box sx={{ margin: "20px 0" }}></Box>
          <Grid container rowSpacing={1} spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: " 16px",
                  zIndex: 0,
                  padding: "24px",
                }}
              >
                <div className="mb-5 text-lg font-semibold">
                  Thông tin lịch chiếu
                </div>
                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="select">Chọn phim</InputLabel>
                      <Select
                        labelId="select"
                        id="select"
                        label="Chọn phim"
                        open={data.openCtr.movie} // control open
                        onClose={handleCloseMovie}
                        onOpen={handleOpenMovie}
                        onChange={handleSelectMovie} // value={phim.maPhim} tự động truyền vào handleSelectPhim sau khi chọn phim
                        value={data.setMovie} // giá trị truyền vào quyết định MenuItem nào sẽ được hiển thị sao khi chọn dựa vào value của MenuItem
                      >
                        <MenuItem
                          value=""
                          style={{
                            display: data.openCtr?.movie ? "none" : "block",
                          }}
                          // classes={{
                          //   root: classes.menu__item,
                          //   selected: classes["menu__item--selected"],
                          // }}
                        >
                          Chọn Phim
                        </MenuItem>
                        {movieList?.data?.map((movie) => (
                          <MenuItem
                            value={movie._id} // giá trị sẽ được đẩy lên
                            key={movie._id}
                          >
                            {movie.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="selectTheater"></InputLabel>
                      <Select
                        labelId="selectTheater"
                        id="selectTheater"
                        // label="Chọn rạp"
                        open={data.openCtr.theater} // control open
                        onClose={handleCloseTheater}
                        onOpen={handleOpenTheater}
                        onChange={handleSelectTheater} // value={phim.maPhim} tự động truyền vào handleSelectPhim sau khi chọn phim
                        renderValue={(value) => `${value ? value : "Chọn rạp"}`} // hiển thị giá trị đã chọn
                        value={data.setTheater} // giá trị truyền vào quyết định MenuItem nào sẽ được hiển thị sao khi chọn dựa vào value của MenuItem
                        displayEmpty // hiển thị item đầu tiên
                      >
                        <MenuItem
                          value=""
                          style={{
                            display:
                              data.theaterRender?.result > 0 ? "none" : "block",
                          }}
                        >
                          {data.setMovie
                            ? `${
                                data.startRequest
                                  ? "Đang tìm rạp"
                                  : "Không tìm thấy, vui lòng chọn phim khác"
                              }`
                            : "Vui lòng chọn phim"}
                        </MenuItem>
                        {data.theaterRender?.data?.map((item) => (
                          <MenuItem
                            value={item} // giá trị sẽ được đẩy lên
                            key={item._id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          open={data.openCtr.dateShow}
                          onClose={handleClosedateShow}
                          onOpen={handleOpendateShow}
                          label="Ngày chiếu, giờ chiếu"
                          value={selectedDate}
                          onChange={handleDateChange}
                          onAccept={handleDateAccept}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth>
                      <Select
                        open={data.openCtr.ticketPrice}
                        onClose={handleCloseTicketPrice}
                        onOpen={handleOpenTicketPrice}
                        onChange={handleSelectTicketPrice}
                        value={data.setTicketPrice}
                        renderValue={(value) =>
                          `${value ? value + " vnđ" : "Chọn giá vé"}`
                        }
                        displayEmpty
                      >
                        {data.ticketPriceRender?.map((ticketPrice) => (
                          <MenuItem
                            value={ticketPrice}
                            key={ticketPrice}
                            // classes={{
                            //   root: classes.menu__item,
                            //   selected: classes["menu__item--selected"],
                            // }}
                          >
                            {ticketPrice} vnđ
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <LoadingButton
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={loadingUpdateShowtime}
                      sx={{
                        padding: "6px 9px",
                        fontWeight: "700",
                        lineHeight: "1.71429",
                        fontSize: "0.8rem",
                        textTransform: "capitalize",
                      }}
                      onClick={handleCapNhatLichChieu}
                    >
                      Cập nhật
                    </LoadingButton>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Fragment>
    </Container>
  );
}
