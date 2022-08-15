import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import trash2Fill from "@iconify/icons-eva/trash-2-outline";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// material
import { useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  // transition: theme.transitions.create(["box-shadow", "width"], {
  //   easing: theme.transitions.easing.easeInOut,
  //   duration: theme.transitions.duration.shorter,
  // }),
  // "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  // "& fieldset": {
  //   borderWidth: `1px !important`,
  //   borderColor: `${theme.palette.grey[500_32]} !important`,
  // },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterRole: PropTypes.string,
  onFilterRole: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  filterRole,
  onFilterRole,
}) {
  return (
    <RootStyle
      sx={{
        "&.MuiToolbar-root": { padding: "10px !important" },
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="select-role">Quyền</InputLabel>
              <Select
                labelId="select-role"
                id="select-role"
                value={filterRole}
                onChange={onFilterRole}
                label="Quyền"
              >
                <MenuItem value={`all`}>Tất cả</MenuItem>
                <MenuItem value={`user`}>User</MenuItem>
                <MenuItem value={`admin`}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <SearchStyle
              value={filterName}
              onChange={onFilterName}
              placeholder="Tìm người dùng..."
              label="    "
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      )}

      {numSelected > 0 && (
        <Tooltip title="Xoá">
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
