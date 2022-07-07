import { Icon } from "@iconify/react";
import {useRef, useState } from "react";
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
  deleteMovie,
} from "../../redux/actions/Movie";
import UseApiCheckIsMaPhimSetShowtime from "../../utils/useApiCheckIsIdMovieSetShowtime";

// ----------------------------------------------------------------------

export default function UserMoreMenu({ idMovie }) {
  const history = useHistory();
  const {loadingDeleteMovie,  } =
    useSelector((state) => state.MovieReducer);
  const isMovieSetShowtime = UseApiCheckIsMaPhimSetShowtime(idMovie);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  // xóa một user
  const handleDeleteOne = (_id) => {
    if (loadingDeleteMovie) {
      // nếu click xóa liên tục một user
      return;
    }
    dispatch(deleteMovie(_id));
  };

  const handleEditDetail = () => {
    history.push(`/admin/movies/edit/${idMovie}`);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      {isMovieSetShowtime ? (
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
            sx={{
              color: "rgba(145, 158, 171, 0.8)",
              "&:hover": {
                // backgroundColor: "transparent !important",
                cursor: "not-allowed",
              },
            }}
            onClick={(e) => handleDeleteOne(idMovie)}
          >
            <ListItemIcon>
              <Icon icon={trash2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Không thể xoá"
              primaryTypographyProps={{ variant: "body2" }}
              sx={{
                color: "rgba(145, 158, 171, 0.8)",
              }}
            />
          </MenuItem>

          <MenuItem
            component={RouterLink}
            sx={{
              color: "rgb(33, 43, 54)",
              "&:hover": { color: "rgb(33, 43, 54)" },
            }}
            onClick={(e) => handleEditDetail()}
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
      ) : (
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
            sx={{
              color: "rgb(255, 72, 66)",
            }}
            onClick={(e) => handleDeleteOne(idMovie)}
            disable={true}
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
            sx={{
              color: "rgb(33, 43, 54)",
              "&:hover": { color: "rgb(33, 43, 54)" },
            }}
            onClick={(e) => handleEditDetail()}
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
      )}
    </>
  );
}
