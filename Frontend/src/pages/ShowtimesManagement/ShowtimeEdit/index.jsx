import React, { Fragment, useEffect } from "react";
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Tab,
  Stack,
} from "@mui/material";
import Info from "./Info";

export default function ShowtimeEdit() {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      href="/"
      color="text.primary"
      sx={{ "&:hover": { color: "#212B36" } }}
    >
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      href="/admin/showtimes/list"
      color="text.primary"
      sx={{ "&:hover": { color: "#212B36" } }}
    >
      Lịch chiếu
    </Link>,
    <Typography key="3" color="inherit">
      Chỉnh sửa lịch chiếu
    </Typography>,
  ];
  return (
    <Container  sx={{ paddingRight: "0px !important", paddingLeft: "0px !important" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={12}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Chỉnh sửa lịch chiếu
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Stack>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Info />
      </Box>
    </Container>
  );
}
