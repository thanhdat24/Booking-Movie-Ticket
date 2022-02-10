import React, { Fragment, useEffect } from "react";
import {
  Box,
  Stack,
  Card,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useFormik, Form, ErrorMessage, Formik } from "formik";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";
import { filter } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import moment from "moment";
import { resetUpdate, updateCurrentUser } from "../../redux/actions/Auth";

export default function Info() {
  const dispatch = useDispatch();
  const { currentUser, successUpdateUser, loadingUpdateUser, errorUpdateUser } =
    useSelector((state) => state.AuthReducer);
  const { enqueueSnackbar } = useSnackbar();
  const phoneRegExp =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

  const UpdateSchema = Yup.object().shape({
    fullName: Yup.string().required("*Họ tên không được bỏ trống !"),
    email: Yup.string()
      .required("*Email không được bỏ trống !")
      .email("* Email không hợp lệ "),
    phoneNumber: Yup.string()
      .required("*Số điện thoại không được bỏ trống!")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
    gender: Yup.string().required("*Giới tính không được bỏ trống!"),
    dateOfBirth: Yup.date()
      .required("*Ngày sinh không được bỏ trống!")
      .test("checkAge", "Ngày phải nhỏ hơn ngày hôm nay", (value) => {
        var today = new Date();
        return value < today;
      }),
  });
  const formik = useFormik({
    initialValues: {
      fullName: currentUser?.user.fullName,
      email: currentUser?.user.email,
      phoneNumber: currentUser?.user.phoneNumber,
      gender: currentUser?.user.gender,
      dateOfBirth: moment(currentUser?.user.dateOfBirth).format("YYYY-MM-DD"),

      remember: true,
    },

    validationSchema: UpdateSchema,
    onSubmit: (user) => {
      if (loadingUpdateUser) {
        return;
      }
      dispatch(updateCurrentUser(user));
    },
  });
  useEffect(() => {
    return () => {
      dispatch(resetUpdate());
    };
  }, []);
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const [gender, setGender] = useState(10);

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  useEffect(() => {
    if (successUpdateUser) {
      enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
      return;
    }
    if (errorUpdateUser) {
      enqueueSnackbar(errorUpdateUser, { variant: "error" });
    }
  }, [successUpdateUser, errorUpdateUser]);
  return (
    <Fragment>
      <Box sx={{ margin: "20px 0" }}></Box>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Card
              sx={{
                borderRadius: " 16px",
                zIndex: 0,
                padding: " 80px 24px",
                textAlign: "center",
              }}
            >
              <div>
                <div className="w-36 h-36 rounded-full p-2 border-2 border-dashed border-gray-300 inline-flex">
                  <div className="w-full h-full outline-none overflow-hidden rounded-full items-center justify-center">
                    <input
                      accept="image/*"
                      // className={classes.input}
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      autoComplete="off"
                    />
                    {/* <label htmlFor="raised-button-file">
                              <Button
                                variant="raised"
                                component="span"
                                // className={classes.button}
                              >
                                Upload
                              </Button>
                            </label> */}
                    <span className="overflow-hidden z-10">
                      <img
                        htmlFor="raised-button-file"
                        src={currentUser?.user.photo}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card
              sx={{
                borderRadius: " 16px",
                zIndex: 0,
                padding: "24px",
              }}
            >
              <Formik value={formik}>
                <Form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField
                        fullWidth
                        autoComplete="fullName"
                        type="text"
                        label="Họ tên"
                        {...getFieldProps("fullName")}
                        error={Boolean(touched.fullName && errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                      />{" "}
                      <TextField
                        fullWidth
                        disabled
                        autoComplete="email"
                        type="email"
                        label="Email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Stack>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        {...getFieldProps("phoneNumber")}
                        error={Boolean(
                          touched.phoneNumber && errors.phoneNumber
                        )}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                      <FormControl
                        fullWidth
                        error={Boolean(touched.gender && errors.gender)}
                      >
                        <InputLabel id="select-gender">Giới Tính</InputLabel>
                        <Select
                          sx={{
                            display: "inline-flex",
                            textAlign: "start",
                          }}
                          labelId="select-gender"
                          id="select-gender"
                          value={gender}
                          label="Giới Tính"
                          onChange={handleChangeGender}
                          {...getFieldProps("gender")}
                        >
                          <MenuItem value={`Nam`}>Nam</MenuItem>
                          <MenuItem value={`Nữ`}>Nữ</MenuItem>
                        </Select>
                        <ErrorMessage
                          name="gender"
                          render={(msg) => (
                            <span className="text-red-600 text-xs mt-1 ml-3">
                              {msg}
                            </span>
                          )}
                        />
                      </FormControl>
                    </Stack>

                    <TextField
                      id="date"
                      label="Ngày tháng năm sinh"
                      type="date"
                      fullWidth
                      {...getFieldProps("dateOfBirth")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                      helperText={touched.dateOfBirth && errors.dateOfBirth}
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
                        loading={loadingUpdateUser}
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
                </Form>
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
