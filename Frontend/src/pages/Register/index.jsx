import React from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
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
  InputAdornment,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";

import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/UserManagement";

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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "DatLe",
      email: "user@gmail.com",
      password: "Dat123456",
      passwordConfirm: "Dat123456",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (user) => {
      dispatch(register(user));
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <div className="flex">
      <AuthLayout></AuthLayout>
      <SectionStyle>
        <img src="../img/illustration_register.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography
              variant="h4"
              gutterBottom
              className="text-3xl font-bold text-primary text-green-600 text-center mb-8"
            >
              Đăng ký
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
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
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Username"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email"
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
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPasswordConfirm ? "text" : "password"}
                  label="Confirm Password"
                  {...getFieldProps("passwordConfirm")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() =>
                            setShowPasswordConfirm((prev) => !prev)
                          }
                        >
                          <Icon
                            icon={showPasswordConfirm ? eyeFill : eyeOffFill}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(
                    touched.passwordConfirm && errors.passwordConfirm
                  )}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  color="success"
                >
                  Đăng ký
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Có tài khoản?&nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to="/login"
              class="text-green-600 font-bold "
            >
              Đăng nhập
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </div>
  );
}
