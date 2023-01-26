import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box } from "@mui/material";
import React, { FC, useEffect } from "react";

import { SupportedConstraintsDialog } from "../components/SupportedConstraintsDialog";
import { VideoMediaDeviceDialog } from "../components/VideoMediaDeviceDialog";
import { VideoTrackInfoDialog } from "../components/VideoTrackInfoDialog";
import { useBooleanState } from "../hooks/useBooleanState";
import { AppLayout } from "../layouts/AppLayout";
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
    isTruthy: isVideoMediaDevice,
    onTruthy: openVideoMediaDevice,
    onFalsy: closeVideoMediaDevice,
  } = useBooleanState({ isTruthy: false });

  const {
    isTruthy: isVideoTrackInfo,
    onTruthy: openVideoTrackInfo,
    onFalsy: closeVideoTrackInfo,
  } = useBooleanState({ isTruthy: false });

  return (
    <AppLayout
      fab={{
        children: isVideoPlayed ? <StopIcon /> : <PlayArrowIcon />,
        onClick: isVideoPlayed ? stopMediaStream : startMediaStream,
      }}
      rightMenuItems={[
        {
          label: "Show supported constraints",
          onClick: openSupportedConstraints,
        },
        {
          label: "Show video media device",
          onClick: openVideoMediaDevice,
        },
        {
          label: "Show video track info",
          onClick: openVideoTrackInfo,
        },
      ]}
    >
      <Box sx={{ "&>video": { height: "100%", width: "100%" }, height: "100%", width: "100%" }}>
        <video height="100%" ref={videoRef} width="100%" />
      </Box>

      <SupportedConstraintsDialog onClose={closeSupportedConstraints} open={isOpenSupportedConstraints} />
      <VideoMediaDeviceDialog onClose={closeVideoMediaDevice} open={isVideoMediaDevice} />
      <VideoTrackInfoDialog onClose={closeVideoTrackInfo} open={isVideoTrackInfo} />
    </AppLayout>
  );
};
