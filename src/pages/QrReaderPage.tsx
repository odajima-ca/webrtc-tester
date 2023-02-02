import { Box } from "@mui/material";
import { BrowserQRCodeReader } from "@zxing/browser";
import React, { FC, useEffect, useState } from "react";

import { AppLayout } from "../layouts/AppLayout";
import { useMediaStream, useStopMediaStream } from "../providers/MediaStreamProvider";

export const QrReaderPage: FC = () => {
  const [codeReader, setCodeReader] = useState<BrowserQRCodeReader | undefined>();

  const [resultText, setResultText] = useState("");

  const { videoRef, canvasRef, isVideoPlayed } = useMediaStream();
  useStopMediaStream();

  useEffect(() => {
    const newCodeReader = new BrowserQRCodeReader();
    setCodeReader(newCodeReader);
  }, []);

  useEffect(() => {
    if (!isVideoPlayed) return;
    if (!codeReader) return;

    const video = videoRef.current;

    if (!video) return;

    codeReader.decodeFromVideoElement(video as HTMLVideoElement, (result) => {
      if (result) {
        setResultText(result.getText());
      }
    });
  }, [codeReader, isVideoPlayed, videoRef]);

  // useEffect(() => {
  //   const scan = async () => {
  //     if (!isVideoPlayed) return;
  //     if (!codeReader) return;
  //
  //     const canvas = canvasRef.current;
  //     const video = videoRef.current;
  //
  //     if (!canvas || !video) return;
  //
  //     const context = canvas.getContext("2d");
  //
  //     if (!context) return;
  //
  //     // console.log("scan");
  //
  //     const height = video.videoHeight;
  //     const width = video.videoWidth;
  //
  //     canvas.height = height;
  //     canvas.width = width;
  //
  //     // context.drawImage(video, 0, 0, width, height);
  //     await codeReader.decodeFromVideoElement(video as HTMLVideoElement, (result) => {
  //       if (result) {
  //         setResultText(result.getText());
  //       }
  //     });
  //
  //     requestAnimationFrame(scan);
  //   };
  //
  //   const timerId = requestAnimationFrame(scan);
  //
  //   return () => {
  //     cancelAnimationFrame(timerId);
  //   };
  // }, [canvasRef, codeReader, isVideoPlayed, videoRef]);

  return (
    <AppLayout>
      <Box sx={{ "&>video": { height: "100%", width: "100%" }, height: "100%", width: "100%" }}>
        <video height="100%" ref={videoRef} width="100%" />
      </Box>

      {resultText}
    </AppLayout>
  );
};
