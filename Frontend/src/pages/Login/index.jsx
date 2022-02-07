import React, { Fragment, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import googleFill from "@iconify/icons-eva/google-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import { styled } from "@mui/material/styles";

import {
  Card,
  Stack,
  Link,
  Container,
  Typography,
  Checkbox,
  InputAdornment,
  TextField,
  IconButton,
  FormControlLabel,
  Divider,
  Alert,
} from "@mui/material";

import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/UserManagement";

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 580,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const { errorLogin, currentUser, loadingLogin } = useSelector(
    (state) => state.UserManagement
  );
  const history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    // đăng nhập thành công thì quay về trang trước đó
    if (currentUser) {
      if (location.state === "/") {
        // nếu trang trước đó là "/" thì phải hiện loading do trang home mất nhiều thời gian tải
        // dispatch({ type: LOADING_BACKTO_HOME });
        setTimeout(() => {
          history.push("/");
        }, 50);
        return undefined;
      }
      history.push(location.state);
    }
  }, [currentUser]);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "Dat123456",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (user) => {
      dispatch(login(user));
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <div className="flex">
      <AuthLayout></AuthLayout>
      <SectionStyle>
        <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img src="../img/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              className="text-3xl font-bold text-primary text-green-600 text-center mb-8"
            >
              Đăng nhập
            </Typography>
          </Stack>

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              style={{ border: "1px solid rgba(145, 158, 171, 0.32)" }}
            >
              <Icon icon={googleFill} color="#DF3E30" height={24} />
            </Button>

            <Button
              fullWidth
              size="large"
              style={{ border: "1px solid rgba(145, 158, 171, 0.32)" }}
              variant="outlined"
            >
              <Icon icon={facebookFill} color="#1877F2" height={24} />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              style={{ border: "1px solid rgba(145, 158, 171, 0.32)" }}
            >
              <Icon icon={twitterFill} color="#1C9CEA" height={24} />
            </Button>
          </Stack> */}

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider> */}

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {errorLogin && (
                  <Fragment>
                    <Alert severity="error">{errorLogin}</Alert>
                  </Fragment>
                )}
                {currentUser && (
                  <Fragment>
                    <Alert severity="success">Đăng nhập thành công!</Alert>
                  </Fragment>
                )}
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  {...getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      {...getFieldProps("remember")}
                      checked={values.remember}
                    />
                  }
                  label="Ghi nhớ tôi"
                />

                <Link to="/" component={RouterLink} variant="subtitle2">
                  Quên mật khẩu?
                </Link>
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loadingLogin}
              >
                Đăng nhập
              </LoadingButton>
            </Form>
          </FormikProvider>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Không có tài khoản?&nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to="/register"
            >
              Đăng ký ngay
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </div>
  );
}
