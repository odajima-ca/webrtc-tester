import { Box, Stack } from "@mui/material";
import { BrowserQRCodeReader } from "@zxing/browser";
import React, { FC, useEffect, useState } from "react";

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

      const height = video.videoHeight;
      const width = video.videoWidth;

      canvas.height = height;
      canvas.width = width;

      console.debug("QR Decode");
      context.drawImage(video, width / 4, height / 4, width / 2, height / 2);

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
          <video height="100%" ref={videoRef} width="100%" />
          <Box
            sx={{
              border: "1px solid black",
              height: "50%",
              left: "25%",
              position: "absolute",
              top: "25%",
              width: "50%",
            }}
          />
        </Box>
        <canvas ref={canvasRef} />
      </Stack>
    </AppLayout>
  );
};
