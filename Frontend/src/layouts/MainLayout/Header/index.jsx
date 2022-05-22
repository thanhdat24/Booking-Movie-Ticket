import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { FAKE_AVATAR } from "../../../constants/config";
import { useTheme } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import useStyles from "./style";

const headMenu = [
  { nameLink: "Lịch chiếu", id: "lichchieu" },
  { nameLink: "Cụm rạp", id: "cumrap" },
  { nameLink: "Tin tức", id: "tintuc" },
  { nameLink: "Ứng dụng", id: "ungdung" },
];

export default function Header() {
  const { currentUser } = useSelector((state) => state.AuthReducer);
  console.log("currentUser", currentUser);
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles({ isDesktop, openDrawer });

  const handleClickLink = (id) => {
    setOpenDrawer(false);
    if (location.pathname === "/") {
      scroller.scrollTo(id, {
        duration: 800,
        smooth: "easeInOutQuart",
      });
    } else {
      // dispatch({ type: LOADING_BACKTO_HOME });
      setTimeout(() => {
        history.push("/", id);
      }, 50);
    }
  };

  // const handleLogout = () => {
  //   setOpenDrawer(false)
  //   dispatch({ type: LOGOUT })
  // }

  const handleLogin = () => {
    history.push("/dangnhap", location.pathname); // truyền kèm location.pathname để đăng nhập xong quay lại
  };
  const handleRegister = () => {
    history.push("/dangky", location.pathname);
  };

  const handleUser = () => {
    history.push("/profile");
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root}>
      {/* START HEADER */}
      <AppBar
        class="bg-white p-2 shadow border-b border-transparent z-20 top-0 fixed w-screen"
        position="fixed"
        color="default"
      >
        <Toolbar class="relative max-w-full md:max-w-screen-xl mx-auto flex justify-between items-center">
          {/* logo */}
          <div class="flex space-x-4 flex-shrink-0 items-center">
            <span className={classes.logo}>
              <img
                src="/img/favicon.png"
                alt="logo"
                class="h-11 w-11 cursor-pointer"
              />
            </span>
            <Paper
              class="bg-gray-100 "
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
                "&:focus": {
                  border: "5px solid red",
                },
              }}
            >
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                type="search"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm phim..."
                inputProps={{ "aria-label": "Tìm phim..." }}
              />
              <IconButton></IconButton>
            </Paper>
          </div>
          <div className={classes.linkTobody}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {headMenu.map((link) => (
                <span
                  key={link.id}
                  className={classes.link}
                  onClick={() => handleClickLink(link.id)}
                >
                  {link.nameLink}
                </span>
              ))}
            </Grid>
          </div>

          {/* user account */}
          <div className={classes.user}>
            {currentUser ? (
              <List disablePadding className={classes.auth}>
                <ListItem
                  button
                  classes={{ root: clsx(classes.itemAuth, classes.divide) }}
                  onClick={handleUser}
                >
                  <ListItemIcon classes={{ root: classes.icon }}>
                    <Avatar
                      alt="avatar"
                      className={classes.avatar}
                      src={currentUser?.user.photo}
                    />
                  </ListItemIcon>
                  <ListItemText primary={currentUser?.user.fullName} />
                </ListItem>
                <ListItem button classes={{ root: classes.itemAuth }}>
                  <ListItemText primary="Đăng Xuất" />
                </ListItem>
              </List>
            ) : (
              <List disablePadding className={classes.auth}>
                <ListItem
                  button
                  classes={{ root: clsx(classes.itemAuth, classes.divide) }}
                  onClick={handleLogin}
                >
                  <ListItemIcon classes={{ root: classes.icon }}>
                    {/* <AccountCircleIcon fontSize="large" /> */}
                  </ListItemIcon>
                  <ListItemText primary="Đăng Nhập" />
                </ListItem>
                <ListItem
                  button
                  classes={{ root: classes.itemAuth }}
                  onClick={handleRegister}
                >
                  <ListItemText primary="Đăng Ký" />
                </ListItem>
              </List>
            )}
          </div>

          {/* menuIcon  */}
          <div className={classes.menuIcon}>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerOpen}
              classes={{ root: classes.listItem }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* content open menu*/}
      <Drawer
        className={classes.drawer}
        anchor="right"
        onClose={handleDrawerClose}
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        transitionDuration={300}
      >
        <div className={classes.drawerHeader}>
          {currentUser ? (
            <ListItem
              button
              classes={{
                root: clsx(classes.itemAuth, classes.divide, classes.hover),
              }}
              onClick={handleUser}
            >
              <ListItemIcon classes={{ root: classes.icon }}>
                {/* <Avatar alt="avatar" className={classes.avatar} src={FAKE_AVATAR} /> */}
              </ListItemIcon>
              <ListItemText
                className={classes.username}
                primary={currentUser?.hoTen}
              />
            </ListItem>
          ) : (
            <ListItem
              button
              classes={{ root: classes.listItem }}
              onClick={handleLogin}
            >
              <ListItemIcon classes={{ root: classes.icon }}>
                {/* <AccountCircleIcon fontSize="large" /> */}
              </ListItemIcon>
              <span className={classes.link} style={{ fontWeight: 500 }}>
                Đăng Nhập
              </span>
            </ListItem>
          )}
          <IconButton
            classes={{ root: classes.listItem }}
            onClick={handleDrawerClose}
          >
            {/* <ChevronRightIcon /> */}
          </IconButton>
        </div>
        <List>
          {headMenu.map((link) => (
            <span
              key={link.id}
              className={classes.itemMenu}
              onClick={() => handleClickLink(link.id)}
            >
              {link.nameLink}
            </span>
          ))}

          {currentUser ? (
            <span className={classes.itemMenu}>Đăng Xuất</span>
          ) : (
            <span className={classes.itemMenu} onClick={handleRegister}>
              Đăng Ký
            </span>
          )}
        </List>
      </Drawer>
    </div>
  );
}
