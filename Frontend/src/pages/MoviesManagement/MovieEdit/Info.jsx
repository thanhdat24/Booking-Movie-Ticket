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
  Button,
} from "@mui/material";
import * as Yup from "yup";

import { Icon } from "@iconify/react";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { resetUpdate, updateCurrentUser } from "../../../redux/actions/Auth";
import { useFormik, Form, ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieUploadImg,
  getDetailMovie,
  resetMoviesManagement,
  updateMovie,
} from "../../../redux/actions/Movie";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

export default function Info() {
  const dispatch = useDispatch();
  const history = useHistory();
  // useEffect(() => {
  //   dispatch(getDetailMovie(successDetailMovie?._id));
  // }, []);
  const {
    loadingDetailMovie,
    successDetailMovie,
    successUpdateMovie,
    errorDetailMovie,
    errorUpdateMovie,
  } = useSelector((state) => state.MovieReducer);
  const { enqueueSnackbar } = useSnackbar();
  console.log("successDetailMovie", successDetailMovie);
  const UpdateSchema = Yup.object().shape({
    name: Yup.string().required("*Tên phim không được bỏ trống !"),
    trailer: Yup.string().required("*Trailer không được bỏ trống !"),
    description: Yup.string().required("*Nội dung không được bỏ trống !"),

    releaseDate: Yup.date()
      .required("*Thời gian chiếu không được bỏ trống!")
      .test("checkDate", "Ngày chiếu phải lớn hơn ngày hôm nay", (value) => {
        var today = new Date();
        return value > today;
      }),
  });
  const formik = useFormik({
    initialValues: {
      name: successDetailMovie?.name,
      trailer: successDetailMovie?.trailer,
      description: successDetailMovie?.description,
      duration: successDetailMovie?.duration,
      releaseDate: moment(successDetailMovie?.releaseDate).format("YYYY-MM-DD"),
      photo: successDetailMovie?.photo,
      remember: true,
    },

    validationSchema: UpdateSchema,
    onSubmit: (movie) => {
      if (loadingDetailMovie) {
        return;
      }
      dispatch(updateMovie(movie, successDetailMovie?._id));
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  const [srcImage, setSrcImage] = useState(successDetailMovie?.photo);
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(e.target.result);
    };
    // Đem dữ liệu file lưu vào formik
    formik.setFieldValue("photo", file);
  };

  useEffect(() => {
    if (successUpdateMovie) {
      setTimeout(() => {
        history.push("/admin/movies/list");
      }, 100);
      setTimeout(() => {
        enqueueSnackbar("Cập nhật phim thành công!", { variant: "success" });
      }, 150);
      return;
    }
    if (errorUpdateMovie) {
      enqueueSnackbar(errorUpdateMovie, { variant: "error" });
    }
  }, [successUpdateMovie, errorUpdateMovie]);

  useEffect(() => {
    return () => {
      dispatch(resetMoviesManagement());
    };
  }, []);
  return (
    <Fragment>
      <Box sx={{ margin: "20px 0" }}></Box>
      <Formik value={formik}>
        <Form onSubmit={handleSubmit} enctype="multipart/form-data">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={8}>
              <Card
                sx={{
                  borderRadius: " 16px",
                  zIndex: 0,
                  padding: "24px",
                }}
              >
                <div className="mb-5 text-lg font-semibold">Thông tin phim</div>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    autoComplete="name"
                    type="text"
                    label="Tên phim"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      id="date"
                      label="Ngày khởi chiếu"
                      type="date"
                      sx={{ width: "100%" }}
                      {...getFieldProps("releaseDate")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(touched.releaseDate && errors.releaseDate)}
                      helperText={touched.releaseDate && errors.releaseDate}
                    />
                    <TextField
                      fullWidth
                      label="Thời lượng"
                      {...getFieldProps("duration")}
                      error={Boolean(touched.duration && errors.duration)}
                      helperText={touched.duration && errors.duration}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Nội dung"
                    multiline
                    rows={5}
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <TextField
                    fullWidth
                    autoComplete="description"
                    type="text"
                    label="Trailer"
                    {...getFieldProps("trailer")}
                    error={Boolean(touched.trailer && errors.trailer)}
                    helperText={touched.trailer && errors.trailer}
                  />
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
                      loading={loadingDetailMovie}
                      sx={{
                        padding: "6px 9px",
                        fontWeight: "700",
                        lineHeight: "1.71429",
                        fontSize: "0.8rem",
                        textTransform: "capitalize",
                      }}
                    >
                      Lưu thay đổi
                    </LoadingButton>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                sx={{
                  borderRadius: " 16px",
                  zIndex: 0,
                  padding: " 26px 24px",
                }}
              >
                <div className="mb-5 text-lg font-semibold">Hình ảnh phim</div>
                <hr />
                <div className="text-center">
                  <div className="w-full h-full border-2 border-dashed border-gray-200 inline-flex">
                    <label className="w-full h-full outline-none overflow-hidden items-center justify-center relative cursor-pointer py-12">
                      <input
                        type="file"
                        id="poster"
                        name="poster"
                        hidden
                        multiple
                        onChange={handleChangeFile}
                      />
                      {srcImage ? (
                        <img
                          accept="image/*"
                          multiple
                          src={srcImage}
                          alt="avatar"
                          className="w-48 h-auto inline-flex object-cover"
                        />
                      ) : (
                        <img
                          accept="image/*"
                          multiple
                          src="/img/browe.png"
                          alt="avatar"
                          className="inline-flex"
                        />
                      )}
                      {srcImage ? "" : <h5>Kéo và thả ảnh của phim vào đây</h5>}
                      {srcImage ? "" : <p class="mb-2">or</p>}
                      {srcImage ? (
                        ""
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          Upload
                        </Button>
                      )}
                    </label>
                  </div>
                </div>
                {/* <span className="overflow-hidden z-50 w-full h-full block">
                      <span className=" w-36 h-36 bg-cover inline-block">
                        <img
                          src={srcImage}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </span>
                    </span> */}
              </Card>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Fragment>
  );
}
