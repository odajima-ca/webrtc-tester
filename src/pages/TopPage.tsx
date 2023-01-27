import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box } from "@mui/material";
import React, { FC, useEffect, useMemo } from "react";

import { ApplyConstraintsDialog } from "../components/ApplyConstraintsDialog";
import { SupportedConstraintsDialog } from "../components/SupportedConstraintsDialog";
import { VideoMediaDeviceDialog } from "../components/VideoMediaDeviceDialog";
import { VideoSizeDialog } from "../components/VideoSizeDialog";
import { VideoTrackInfoDialog } from "../components/VideoTrackInfoDialog";
import { useBooleanState } from "../hooks/useBooleanState";
import { AppLayout, AppLayoutProps } from "../layouts/AppLayout";
import { useMediaStream } from "../providers/MediaStreamProvider";

export const TopPage: FC = () => {
  const { videoRef, stopMediaStream, startMediaStream, isVideoPlayed } = useMediaStream();

  useEffect(() => {
    return () => {
      stopMediaStream();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    isTruthy: isOpenSupportedConstraints,
    onTruthy: openSupportedConstraints,
    onFalsy: closeSupportedConstraints,
  } = useBooleanState({ isTruthy: false });

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

  const fab = useMemo<AppLayoutProps["fab"]>(() => {
    if (isVideoPlayed) {
      return {
        children: <StopIcon />,
        onClick: () => stopMediaStream(),
      };
    }

    return {
      children: <PlayArrowIcon />,
      onClick: () => startMediaStream(),
    };
  }, [isVideoPlayed, startMediaStream, stopMediaStream]);

  const rightMenuItems = useMemo<AppLayoutProps["rightMenuItems"]>(
    () => [
      {
        label: "Show supported constraints",
        onClick: openSupportedConstraints,
      },
      {
        label: "Show video track info",
        onClick: openVideoTrackInfo,
      },
      {
        label: "Show apply constraints",
        onClick: openApplyConstraints,
      },
    ],
    [openApplyConstraints, openSupportedConstraints, openVideoTrackInfo]
  );

  return (
    <AppLayout fab={fab} rightMenuItems={rightMenuItems}>
      <Box sx={{ "&>video": { height: "100%", width: "100%" }, height: "100%", width: "100%" }}>
        <video height="100%" ref={videoRef} width="100%" />
      </Box>

      <SupportedConstraintsDialog onClose={closeSupportedConstraints} open={isOpenSupportedConstraints} />
      <VideoTrackInfoDialog onClose={closeVideoTrackInfo} open={isVideoTrackInfo} />
      <ApplyConstraintsDialog onClose={closeApplyConstraints} open={isOpenApplyConstraints} />
    </AppLayout>
  );
};
