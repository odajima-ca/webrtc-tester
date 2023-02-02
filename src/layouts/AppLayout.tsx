import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { AppBar, Divider, Fab, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { FC, MouseEventHandler, PropsWithChildren, useCallback, useState } from "react";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";

import { ApplyConstraintsDialog } from "../components/ApplyConstraintsDialog";
import { DetectRTCDialog } from "../components/DetectRTCDialog";
import { VideoTrackInfoDialog } from "../components/VideoTrackInfoDialog";
import { useBooleanState } from "../hooks/useBooleanState";
import { useMediaStream } from "../providers/MediaStreamProvider";

const StyledFab = styled(Fab)({
  left: 0,
  margin: "0 auto",
  position: "absolute",
  right: 0,
  top: -30,
  zIndex: 1,
});

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const height = use100vh();

  const { stopMediaStream, startMediaStream, isVideoPlayed } = useMediaStream();

  const [anchorLeftElement, setAnchorLeftElement] = useState<null | HTMLElement>(null);

  const openLeftMenu = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
    setAnchorLeftElement(event.currentTarget);
  }, []);

  const closeLeftMenu = () => {
    setAnchorLeftElement(null);
  };

  const {
    isTruthy: isVideoTrackInfo,
    onTruthy: openVideoTrackInfo,
    onFalsy: closeVideoTrackInfo,
  } = useBooleanState({ isTruthy: false });

  const {
    isTruthy: isOpenApplyConstraints,
    onTruthy: openApplyConstraints,
    onFalsy: closeApplyConstraints,
  } = useBooleanState({ isTruthy: false });

  const {
    isTruthy: isDetectRTC,
    onTruthy: openDetectRTC,
    onFalsy: closeDetectRTC,
  } = useBooleanState({ isTruthy: false });

  return (
    <Box sx={{ height, pb: 7, width: "100vw" }}>
      {children}

      <AppBar color="primary" position="fixed" sx={{ bottom: 0, top: "auto" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={openLeftMenu} size="small" sx={{ ml: 2 }}>
            <MenuIcon />
          </IconButton>

          {isVideoPlayed ? (
            <StyledFab color="secondary" onClick={() => stopMediaStream()}>
              <StopIcon />
            </StyledFab>
          ) : (
            <StyledFab color="secondary" onClick={() => startMediaStream()}>
              <PlayArrowIcon />
            </StyledFab>
          )}

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

        <MenuItem
          onClick={() => {
            openVideoTrackInfo();
            closeLeftMenu();
          }}
        >
          Video Track
        </MenuItem>

        <MenuItem
          onClick={() => {
            openApplyConstraints();
            closeLeftMenu();
          }}
        >
          Constraints
        </MenuItem>

        <MenuItem
          onClick={() => {
            openDetectRTC();
            closeLeftMenu();
          }}
        >
          Detect RTC
        </MenuItem>
      </Menu>

      <VideoTrackInfoDialog onClose={closeVideoTrackInfo} open={isVideoTrackInfo} />
      <ApplyConstraintsDialog onClose={closeApplyConstraints} open={isOpenApplyConstraints} />
      <DetectRTCDialog onClose={closeDetectRTC} open={isDetectRTC} />
    </Box>
  );
};
