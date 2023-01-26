import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box, Dialog, DialogTitle, List, ListItem, ListItemButton } from "@mui/material";
import DetectRTC from "detectrtc";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FallbackListItemText } from "../components/FallbackListItemText";
import { SupportedConstraintsDialog, SupportedConstraintsDialogProps } from "../components/SupportedConstraintsDialog";
import { useBooleanState } from "../hooks/useBooleanState";
import { AppLayout } from "../layouts/AppLayout";
import { useSnackbar } from "../providers/SnackbarProvider";

export const TopPage: FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoDeviceIndex, setVideoDeviceIndex] = useState<number | null>(null);

  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);

  const [supportedConstraints, setSupportedConstraints] =
    useState<SupportedConstraintsDialogProps["supportedConstraints"]>();

  const { showSnack } = useSnackbar();

  const {
    isTruthy: isVideoPlayed,
    onTruthy: playVideoState,
    onFalsy: stopVideoState,
  } = useBooleanState({ isTruthy: false });

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      video.muted = true;
      video.volume = 0;
      video.setAttribute("playsinline", "playsinline");
      video.srcObject = mediaStream;
      await video.play();
      playVideoState();

      const newMediaDevices = await navigator.mediaDevices.enumerateDevices();
      setMediaDevices(newMediaDevices);
      setSupportedConstraints(navigator.mediaDevices.getSupportedConstraints());

      showSnack({
        message: "Started",
        security: "info",
      });
    } catch (error: any) {
      showSnack({
        message: error.toString(),
        security: "error",
      });
    }
  }, [playVideoState, showSnack]);

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const mediaStream = video.srcObject as MediaStream;
    mediaStream?.getTracks().forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
    stopVideoState();
    showSnack({
      message: "Stopped",
      security: "info",
    });
  }, [stopVideoState, showSnack]);

  const toggleVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.paused ? playVideo() : stopVideo();
  }, [playVideo, stopVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    return () => {
      const mediaStream = video.srcObject as MediaStream;
      mediaStream?.getTracks().forEach((track) => {
        track.stop();
      });
      video.srcObject = null;
    };
  }, []);

  const {
    isTruthy: isOpenSupportedConstraints,
    onTruthy: openSupportedConstraints,
    onFalsy: closeSupportedConstraints,
  } = useBooleanState({ isTruthy: false });

  return (
    <AppLayout
      fab={{
        children: isVideoPlayed ? <StopIcon /> : <PlayArrowIcon />,
        onClick: toggleVideo,
      }}
      rightMenuItems={[
        {
          label: "Show supported constraints",
          onClick: openSupportedConstraints,
        },
      ]}
    >
      <Box sx={{ "&>video": { height: "100%", width: "100%" }, height: "100%", width: "100%" }}>
        <video height="100%" ref={videoRef} width="100%" />
      </Box>
      <SupportedConstraintsDialog
        onClose={closeSupportedConstraints}
        open={isOpenSupportedConstraints}
        supportedConstraints={supportedConstraints}
      />
    </AppLayout>
  );
};
