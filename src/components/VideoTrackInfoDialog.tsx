import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import Highlight from "react-highlight";

import { useMediaStream } from "../providers/MediaStreamProvider";
import { FullScreenDialog, FullScreenDialogProps } from "./FullScreenDialog";

export const VideoTrackInfoDialog: FC<Omit<FullScreenDialogProps, "title" | "onSubmit">> = (props) => {
  const { videoTrackInfo } = useMediaStream();

  const [tabName, setTabName] = useState("settings");

  if (videoTrackInfo) {
    return (
      <FullScreenDialog {...props} title="Video Track Info">
        <TabContext value={tabName}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              aria-label="lab API tabs example"
              onChange={(event, newTabName) => {
                setTabName(newTabName);
              }}
              scrollButtons={true}
              variant="scrollable"
            >
              <Tab label="settings" value="settings" />
              <Tab label="constraints" value="constraints" />
              <Tab label="capabilities" value="capabilities" />
            </TabList>
          </Box>
          <TabPanel sx={{ p: 0 }} value="settings">
            <Highlight>{JSON.stringify(videoTrackInfo?.settings, null, "\t")}</Highlight>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="constraints">
            <Highlight>{JSON.stringify(videoTrackInfo?.constraints, null, "\t")}</Highlight>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="capabilities">
            <Highlight>{JSON.stringify(videoTrackInfo?.capabilities, null, "\t")}</Highlight>
          </TabPanel>
        </TabContext>
      </FullScreenDialog>
    );
  }

  return (
    <FullScreenDialog {...props} title="Video Track Info">
      <Typography>Play Start Video</Typography>
    </FullScreenDialog>
  );
};
