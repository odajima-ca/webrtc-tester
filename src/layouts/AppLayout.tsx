import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AppBar, Divider, Fab, FabProps, IconButton, Menu, MenuItem, MenuItemProps, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { FC, MouseEventHandler, PropsWithChildren, ReactNode, useCallback, useState } from "react";
import { use100vh } from "react-div-100vh";
import { Link, LinkProps } from "react-router-dom";

const StyledFab = styled(Fab)({
  left: 0,
  margin: "0 auto",
  position: "absolute",
  right: 0,
  top: -30,
  zIndex: 1,
});

type LinkMenuItemProps = Partial<Pick<LinkProps, "to"> & Pick<MenuItemProps, "onClick">> & {
  label: ReactNode;
};

export type AppLayoutProps = PropsWithChildren<{
  fab: FabProps;
  menuItems?: LinkMenuItemProps[];
}>;

export const AppLayout: FC<AppLayoutProps> = ({ children, fab, menuItems = [] }) => {
  const height = use100vh();

  const [anchorLeftElement, setAnchorLeftElement] = useState<null | HTMLElement>(null);

  const openLeftMenu = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
    setAnchorLeftElement(event.currentTarget);
  }, []);

  const closeLeftMenu = () => {
    setAnchorLeftElement(null);
  };

  return (
    <Box sx={{ height, pb: 7, width: "100vw" }}>
      {children}

      <AppBar color="primary" position="fixed" sx={{ bottom: 0, top: "auto" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={openLeftMenu} size="small" sx={{ ml: 2 }}>
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
        anchorEl={anchorLeftElement}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        onClick={closeLeftMenu}
        onClose={closeLeftMenu}
        open={!!anchorLeftElement}
        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem component={Link} onClick={closeLeftMenu} to="/">
          TOP
        </MenuItem>

        <MenuItem component={Link} onClick={closeLeftMenu} to="/qr-reader/">
          QR Reader
        </MenuItem>

        <Divider />

        {menuItems.map((menuItem, index) => {
          if (menuItem.to && menuItem.label) {
            return (
              <MenuItem component={Link} key={index} onClick={closeLeftMenu} to={menuItem.to}>
                {menuItem.label}
              </MenuItem>
            );
          }

          if (menuItem.onClick && menuItem.label) {
            return (
              <MenuItem
                key={index}
                onClick={(event) => {
                  menuItem.onClick?.(event);
                  closeLeftMenu();
                }}
              >
                {menuItem.label}
              </MenuItem>
            );
          }

          return null;
        })}
      </Menu>
    </Box>
  );
};
