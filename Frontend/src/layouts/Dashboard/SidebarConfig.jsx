import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";

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
    icon: getIcon("ic:baseline-theaters"),
  },
];

export default sidebarConfig;
