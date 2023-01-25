import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box, Card, CardActions, CardContent, CardMedia, Collapse, IconButton, Typography } from "@mui/material";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import { ExpandMoreButton } from "../components/ExpandMoreButton";
import { useSnackbar } from "../providers/SnackbarProvider";

export const CameraPage: FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoDeviceIndex, setVideoDeviceIndex] = useState<number | null>(null);

  const [videoDevices, setVideoDevices] = useState<string[]>([]);

  const [expanded, setExpanded] = useState(false);

  const onToggleExpand = useCallback(() => {
    setExpanded((currentExpanded) => !currentExpanded);
  }, []);

  const { showSnack } = useSnackbar();

  const onPlayMediaStream = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((mediaStream) => {
        video.muted = true;
        video.volume = 0;
        video.setAttribute("playsinline", "playsinline");
        video.srcObject = mediaStream;
        video
          .play()
          .then(() => {
            showSnack({
              message: "started",
              security: "info",
            });
          })
          .catch((error) => {
            showSnack({
              message: error.message,
              security: "error",
            });
          });
      })
      .catch((error) => {
        showSnack({
          message: error.message,
          security: "error",
        });
      });
  }, [showSnack]);

  const onStopMediaStream = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    const mediaStream = video.srcObject as MediaStream;

    mediaStream?.getTracks().forEach((track) => {
      track.stop();
    });

    video.srcObject = null;
  }, []);

  useEffect(() => onStopMediaStream, [onStopMediaStream]);

  return (
    <Box sx={{ p: 1 }}>
      <Card sx={{ minWidth: 300 }}>
        <CardMedia component="video" ref={videoRef} />
        <CardActions disableSpacing>
          <IconButton onClick={onPlayMediaStream}>
            <PlayArrowIcon />
          </IconButton>
          <IconButton onClick={onStopMediaStream}>
            <StopIcon />
          </IconButton>
          <ExpandMoreButton aria-expanded={expanded} aria-label="show more" expand={expanded} onClick={onToggleExpand}>
            <ExpandMoreIcon />
          </ExpandMoreButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};
