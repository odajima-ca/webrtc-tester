import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box } from "@mui/material";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import { AppLayout } from "../layouts/AppLayout";
import { useSnackbar } from "../providers/SnackbarProvider";

export const TopPage: FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoDeviceIndex, setVideoDeviceIndex] = useState<number | null>(null);

  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);

  const [supportedConstraints, setSupportedConstraints] = useState<MediaTrackSupportedConstraints | null>(null);

  const [isPlayed, setIsPlayed] = useState(false);

  const onToggleExpand = useCallback(() => {
    setIsPlayed((currentExpanded) => !currentExpanded);
  }, []);

  const { showSnack } = useSnackbar();

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
      setIsPlayed(true);

      const newMediaDevices = await navigator.mediaDevices.enumerateDevices();
      setMediaDevices(newMediaDevices);
      setSupportedConstraints(navigator.mediaDevices.getSupportedConstraints());

      showSnack({
        message: "started",
        security: "info",
      });
    } catch (error: any) {
      showSnack({
        message: error.toString(),
        security: "error",
      });
    }
  }, [showSnack]);

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const mediaStream = video.srcObject as MediaStream;
    mediaStream?.getTracks().forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
    setIsPlayed(false);
  }, []);

  const toggleVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    isPlayed ? stopVideo() : playVideo();
  }, [isPlayed, playVideo, stopVideo]);

  useEffect(() => stopVideo, [stopVideo]);

  return (
    <AppLayout
      fab={{
        children: isPlayed ? <StopIcon /> : <PlayArrowIcon />,
        onClick: toggleVideo,
      }}
    >
      <Box sx={{ "&>video": { height: "100%", width: "100%" }, height: "100%", width: "100%" }}>
        <video height="100%" ref={videoRef} width="100%" />
      </Box>
    </AppLayout>
  );
};
