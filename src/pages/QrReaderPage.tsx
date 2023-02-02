import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box } from "@mui/material";
import React, { FC, useEffect, useMemo } from "react";

import { ApplyConstraintsDialog } from "../components/ApplyConstraintsDialog";
import { DetectRTCDialog } from "../components/DetectRTCDialog";
import { useBooleanState } from "../hooks/useBooleanState";
import { AppLayout, AppLayoutProps } from "../layouts/AppLayout";
import { useMediaStream } from "../providers/MediaStreamProvider";

export const QrReaderPage: FC = () => {
  const { videoRef, stopMediaStream, startMediaStream, isVideoPlayed } = useMediaStream();

  useEffect(() => {
    return () => {
      stopMediaStream();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        label: "Media Device Constraints",
        onClick: openApplyConstraints,
      },
      {
        label: "Detect RTC",
        onClick: openDetectRTC,
      },
    ],
    [openApplyConstraints, openDetectRTC]
  );

  return (
    <AppLayout fab={fab} menuItems={menuItems}>
      <Box sx={{ "&>video": { height: "100%", width: "100%" }, height: "100%", width: "100%" }}>
        <video height="100%" ref={videoRef} width="100%" />
      </Box>

      <ApplyConstraintsDialog onClose={closeApplyConstraints} open={isOpenApplyConstraints} />
      <DetectRTCDialog onClose={closeDetectRTC} open={isDetectRTC} />
    </AppLayout>
  );
};
