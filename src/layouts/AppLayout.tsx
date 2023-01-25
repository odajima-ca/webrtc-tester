import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Fab,
  FabProps,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SpeedDialAction,
  Toolbar,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { styled } from "@mui/material/styles";
import React, { FC, MouseEventHandler, PropsWithChildren, useCallback, useState } from "react";
import { use100vh } from "react-div-100vh";
import { Link, useOutlet } from "react-router-dom";

const StyledFab = styled(Fab)({
  left: 0,
  margin: "0 auto",
  position: "absolute",
  right: 0,
  top: -30,
  zIndex: 1,
});

type AppLayoutProps = PropsWithChildren<{
  fab: FabProps;
}>;

export const AppLayout: FC<AppLayoutProps> = ({ children, fab }) => {
  const theme = useTheme();

  const height = use100vh();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ height, width: "100vw" }}>
      {children}

      <AppBar color="primary" position="fixed" sx={{ bottom: 0, top: "auto" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={openMenu} size="small" sx={{ ml: 2 }}>
            <MenuIcon />
          </IconButton>

          <StyledFab color="secondary" {...fab} />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Menu
        PaperProps={{
          elevation: 0,
        }}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        id="account-menu"
        onClick={closeMenu}
        onClose={closeMenu}
        open={!!anchorEl}
        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem component={Link} onClick={closeMenu} to="/">
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          トップ
        </MenuItem>
        <MenuItem component={Link} onClick={closeMenu} to="/device">
          <ListItemIcon>
            <DevicesIcon fontSize="small" />
          </ListItemIcon>
          デバイス情報
        </MenuItem>
      </Menu>
    </Box>
  );
};
