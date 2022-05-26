import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink, useHistory } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteShowTimes,
  getDetailShowtimes,
} from "../../redux/actions/BookTicket";

// ----------------------------------------------------------------------

export default function ShowtimesMoreMenu({ _id }) {
  const { loadingDeleteShowtime, successDetailShowtime } = useSelector(
    (state) => state.BookTicketReducer
  );
  const history = useHistory();

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteOne = (_id) => {
    if (!loadingDeleteShowtime) {
      dispatch(deleteShowTimes(_id));
    }
  };

  const handleEditDetail = (_id) => {
    if (!successDetailShowtime) {
    }
    dispatch(getDetailShowtimes(_id));

    setTimeout(() => {
      history.push(`/admin/showtimes/edit/${_id}`);
    }, 1500);
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "rgb(255, 72, 66);" }}
          onClick={(e) => handleDeleteOne(_id)}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Xoá"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{
            color: "rgb(33, 43, 54)",
            "&:hover": { color: "rgb(33, 43, 54)" },
          }}
          onClick={(e) => handleEditDetail(_id)}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Chỉnh sửa"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
