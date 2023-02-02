import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box } from "@mui/material";
import React, { FC, useEffect, useMemo } from "react";

import { ApplyConstraintsDialog } from "../components/ApplyConstraintsDialog";
import { DetectRTCDialog } from "../components/DetectRTCDialog";
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

  const menuItems = useMemo<AppLayoutProps["menuItems"]>(
    () => [
      {
        label: "Video Track Info",
        onClick: openVideoTrackInfo,
      },
      {
        label: "Media Device Constraints",
        onClick: openApplyConstraints,
      },
      {
        label: "Detect RTC",
        onClick: openDetectRTC,
      },
    ],
    [openApplyConstraints, openDetectRTC, openVideoTrackInfo]
  );

  return (
    <AppLayout fab={fab} menuItems={menuItems}>
      <Box sx={{ "&>video": { height: "100%", width: "100%" }, height: "100%", width: "100%" }}>
        <video height="100%" ref={videoRef} width="100%" />
      </Box>

      <VideoTrackInfoDialog onClose={closeVideoTrackInfo} open={isVideoTrackInfo} />
      <ApplyConstraintsDialog onClose={closeApplyConstraints} open={isOpenApplyConstraints} />
      <DetectRTCDialog onClose={closeDetectRTC} open={isDetectRTC} />
    </AppLayout>
  );
};
