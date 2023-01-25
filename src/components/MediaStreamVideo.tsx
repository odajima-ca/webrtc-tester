import React, { FC, HTMLAttributes, useEffect, useRef } from "react";

import { useSnackbar } from "../providers/SnackbarProvider";

type MediaStreamVideoProps = HTMLAttributes<HTMLVideoElement> & {
  mediaStream: MediaStream;
};

export const MediaStreamVideo: FC<MediaStreamVideoProps> = ({ mediaStream, ...props }) => {
  const { showSnack } = useSnackbar();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video?.played) {
      return;
    }

    if (video && mediaStream) {
      video.muted = true;
      video.volume = 0;
      video.setAttribute("playsinline", "playsinline");
      video.srcObject = mediaStream;
      video.play().then(() => {
        showSnack({
          message: "Start",
          security: "info",
        });
      });
    }
  }, [mediaStream, showSnack]);

  return <video ref={videoRef} {...props} />;
};
