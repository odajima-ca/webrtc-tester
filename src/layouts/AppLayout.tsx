import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AppBar, Fab, FabProps, IconButton, Menu, MenuItem, MenuItemProps, Toolbar } from "@mui/material";
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

const leftMenuItems: LinkMenuItemProps[] = [
  {
    label: "Top",
    to: "/",
  },
  {
    label: "device",
    to: "/device",
  },
];

export type AppLayoutProps = PropsWithChildren<{
  fab: FabProps;
  rightMenuItems?: LinkMenuItemProps[];
}>;

export const AppLayout: FC<AppLayoutProps> = ({ children, fab, rightMenuItems = [] }) => {
  const height = use100vh();

  const [anchorLeftElement, setAnchorLeftElement] = useState<null | HTMLElement>(null);

  const openLeftMenu = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
    setAnchorLeftElement(event.currentTarget);
  }, []);

  const closeLeftMenu = () => {
    setAnchorLeftElement(null);
  };

  const [anchorRightElement, setAnchorRightElement] = useState<null | HTMLElement>(null);

  const openRightMenu = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
    setAnchorRightElement(event.currentTarget);
  }, []);

  const closeRightMenu = () => {
    setAnchorRightElement(null);
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

          {rightMenuItems.length > 0 && (
            <IconButton color="inherit" onClick={openRightMenu} size="small" sx={{ mr: 2 }}>
              <MoreVertIcon />
            </IconButton>
          )}
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
        {leftMenuItems.map((menuItem, index) => {
          if (menuItem.to && menuItem.label) {
            return (
              <MenuItem component={Link} key={index} onClick={closeLeftMenu} to={menuItem.to}>
                {menuItem.label}
              </MenuItem>
            );
          }

          return null;
        })}
      </Menu>

      {rightMenuItems.length > 0 && (
        <Menu
          PaperProps={{
            elevation: 0,
          }}
          anchorEl={anchorRightElement}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          onClick={closeRightMenu}
          onClose={closeRightMenu}
          open={!!anchorRightElement}
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {rightMenuItems.map((menuItem, index) => {
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
      )}
    </Box>
  );
};
