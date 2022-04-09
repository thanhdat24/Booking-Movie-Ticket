import { Icon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Quản lý người dùng",
    path: "/admin/users/list",
    icon: getIcon(peopleFill),
    children: [
      {
        title: "List",
        path: "/admin/users/list",
        icon: getIcon("ci:dot-02-s"),
      },
      {
        title: "Account",
        path: "/admin/users/account",
        icon: getIcon("ci:dot-02-s"),
      },
    ],
  },
  {
    title: "Quản lý phim",
    path: "/admin/movies/list",
    children: [
      {
        title: "List",
        path: "/admin/movies/list",
        icon: getIcon("ci:dot-02-s"),
      },
      {
        title: "Create",
        path: "/admin/movies/create",
        icon: getIcon("ci:dot-02-s"),
      },
    ],
    icon: getIcon("bx:bxs-movie-play"),
  },
  {
    title: "Quản lý rạp",
    path: "/admin/theater/list",
    children: [
      {
        title: "List",
        path: "/admin/theater/list",
        icon: getIcon("ci:dot-02-s"),
      },
      {
        title: "Create",
        path: "/admin/theater/create",
        icon: getIcon("ci:dot-02-s"),
      },
    ],
    icon: getIcon("ic:baseline-theaters"),
  },
  {
    title: "Quản lý lịch chiếu phim",
    path: "/admin/showtimes/list",
    children: [
      {
        title: "List",
        path: "/admin/showtimes/list",
        icon: getIcon("ci:dot-02-s"),
      },
      {
        title: "Create",
        path: "/admin/showtimes/create",
        icon: getIcon("ci:dot-02-s"),
      },
    ],
    icon: getIcon("map:movie-theater"),
  },
];

export default sidebarConfig;
