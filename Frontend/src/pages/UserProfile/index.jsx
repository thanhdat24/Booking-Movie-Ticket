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
import { Icon } from "@iconify/react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { resetUpdate, updateCurrentUser } from "../../redux/actions/Auth";
import ChangePassword from "./ChangePassword";
import Info from "./Info";

export default function UsersManagement() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
    >
      User
    </Link>,
    <Typography key="3" color="text.primary">
      Account Settings
    </Typography>,
  ];
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={12}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Account
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Stack>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={{ flexDirection: "row" }}
                icon={
                  <Icon
                    style={{
                      display: "inline-flex",
                      marginBottom: "0px",
                      marginRight: "8px",
                      width: "20px",
                      height: "20px",
                    }}
                    icon="ic:baseline-account-box"
                  />
                }
                label="General"
                value="1"
              />
              <Tab
                sx={{ flexDirection: "row" }}
                icon={
                  <Icon
                    style={{
                      display: "inline-flex",
                      marginBottom: "0px",
                      marginRight: "8px",
                      width: "20px",
                      height: "20px",
                    }}
                    icon="el:key"
                  />
                }
                label="Change Password"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Info />
          </TabPanel>
          <TabPanel value="2">
            <ChangePassword />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
