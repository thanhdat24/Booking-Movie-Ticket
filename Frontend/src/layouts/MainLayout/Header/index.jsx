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
import { styled, alpha } from "@mui/material/styles";
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
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles({ isDesktop, openDrawer });
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "18ch",
        "&:focus": {
          width: "23ch",
        },
      },
    },
  }));
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    boxShadow: "0 1px 4px 0px rgb(0 0 0 / 25%)",
  }));
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
      <div
        className="bg-white p-2 shadow border-b border-transparent z-20 top-0 fixed w-screen"
        position="fixed"
        color="default"
      >
        <Toolbar className="relative max-w-full md:max-w-screen-xl mx-auto flex justify-between items-center">
          {/* logo */}
          <div className="flex space-x-4 flex-shrink-0 items-center">
            <span className={classes.logo}>
              <img
                src="/img/favicon.png"
                alt="logo"
                className="h-11 w-11 cursor-pointer"
              />
            </span>
            <Paper
              className="bg-gray-100 "
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                // width: 300,
                "&:focus": {
                  border: "5px solid red",
                },
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Tìm phim..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
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
      </div>

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
