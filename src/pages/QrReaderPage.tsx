import { Box, Stack } from "@mui/material";
import { BrowserQRCodeReader } from "@zxing/browser";
import React, { FC, useEffect, useState } from "react";

import { Video } from "../components/Video";
import { AppLayout } from "../layouts/AppLayout";
import { useMediaStream, useStopMediaStream } from "../providers/MediaStreamProvider";

export const QrReaderPage: FC = () => {
  const [codeReader, setCodeReader] = useState<BrowserQRCodeReader | undefined>();

  const { videoRef, canvasRef, isVideoPlayed } = useMediaStream();
  useStopMediaStream();

  useEffect(() => {
    const newCodeReader = new BrowserQRCodeReader();
    setCodeReader(newCodeReader);
  }, []);

  useEffect(() => {
    const scan = async () => {
      if (!isVideoPlayed) return;
      if (!codeReader) return;

      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      const context = canvas.getContext("2d");

      if (!context) return;

      const height = video.videoHeight / 3;
      const width = video.videoWidth / 3;

      canvas.height = height;
      canvas.width = width;

      console.info("Scan");

      context.drawImage(video, width / 2, height / 2, width, width, 0, 0, width, width);

      try {
        const result = await codeReader.decodeFromCanvas(canvas);

        if (result) {
          const text = result.getText();
          console.info("QR Decoded", text);
        }
      } catch (error) {
        // noop
      }

      requestAnimationFrame(scan);
    };

    const timerId = requestAnimationFrame(scan);

    return () => {
      cancelAnimationFrame(timerId);
    };
  }, [canvasRef, codeReader, isVideoPlayed, videoRef]);

  return (
    <AppLayout>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          "& canvas": { display: "none" },
          "& video": { height: "100%", width: "100%" },
          height: "100%",
          width: "100%",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Video height="100%" ref={videoRef} width="100%" />
          <Box
            sx={{
              border: "1px solid black",
              height: "50vw",
              left: "50%",
              position: "absolute",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "50vw",
            }}
          />
        </Box>
        <canvas ref={canvasRef} />
      </Stack>
    </AppLayout>
  );
};
