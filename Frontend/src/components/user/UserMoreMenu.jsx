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
import { deleteUser } from "../../redux/actions/Users";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser } from "../../redux/actions/Auth";

// ----------------------------------------------------------------------

export default function UserMoreMenu({ userId }) {
  const history = useHistory();
  const { loadingDelete } = useSelector((state) => state.UserManagement);
  const { successGetDetailUser } = useSelector((state) => state.AuthReducer);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // xóa một user
  const handleDeleteOne = (_id) => {
    if (loadingDelete) {
      // nếu click xóa liên tục một user
      return;
    }
    dispatch(deleteUser(_id));
  };

  const handleEditDetail = (_id) => {
    if (!successGetDetailUser) {
    }
    dispatch(getDetailUser(_id));

    setTimeout(() => {
      history.push(`/admin/users/edit/${userId}`);
    }, 1300);
  };
  // useEffect(() => {
  //   if (history.push("/admin/users/list")) {
  //     return () => {
  //       dispatch(resetUpdate());
  //     };
  //   }
  // }, []);
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
          onClick={(e) => handleDeleteOne(userId)}
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
          // to={{ pathname: `/admin/users/edit/${userId}` }}
          sx={{
           
            color: "rgb(33, 43, 54)",
          
            "&:hover": { color: "rgb(33, 43, 54)" },
          }}
          onClick={(e) => handleEditDetail(userId)}
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
