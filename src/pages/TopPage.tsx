import { Box } from "@mui/material";
import React, { FC } from "react";

import { Video } from "../components/Video";
import { AppLayout } from "../layouts/AppLayout";
import { useMediaStream, useStopMediaStream } from "../providers/MediaStreamProvider";

export const TopPage: FC = () => {
  const { videoRef } = useMediaStream();
  useStopMediaStream();

  return (
    <AppLayout>
      <Box sx={{ "&>video": { height: "100%", width: "100%" }, height: "100%", width: "100%" }}>
        <Video height="100%" ref={videoRef} width="100%" />
      </Box>
    </AppLayout>
  );
};
