import { useEffect, useState } from "react";

import { useSnackbar } from "../providers/SnackbarProvider";

type UseUserMediaStreamProps = {
  constraints?: MediaStreamConstraints;
};

export const useUserMediaStream = ({ constraints = { audio: true, video: true } }: UseUserMediaStreamProps) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const { showSnack } = useSnackbar();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((newMediaStream) => {
        setMediaStream(newMediaStream);
      })
      .catch((error) => {
        showSnack({
          message: error.message,
          security: "error",
        });
      });
  }, [constraints, mediaStream, showSnack]);

  useEffect(() => {
    return () => {
      mediaStream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [mediaStream]);

  return mediaStream;
};
