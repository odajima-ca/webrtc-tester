import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  List,
  ListItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import Highlight from "react-highlight";

import { useMediaStream } from "../providers/MediaStreamProvider";

export const VideoTrackInfoDialog: FC<DialogProps> = (props) => {
  const { videoTrackInfo } = useMediaStream();

  const [tabName, setTabName] = useState("settings");

  if (videoTrackInfo) {
    return (
      <Dialog {...props}>
        <DialogTitle>Video Track Info</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "scroll" }}>
            <Tabs
              aria-label="basic tabs example"
              onChange={(event, newTabName) => {
                setTabName(newTabName);
              }}
              value={tabName}
            >
              <Tab label="settings" value="settings" />
              <Tab label="constraints" value="constraints" />
              <Tab label="capabilities" value="capabilities" />
            </Tabs>
          </Box>
          {tabName === "settings" && <Highlight>{JSON.stringify(videoTrackInfo?.settings, null, "\t")}</Highlight>}
          {tabName === "constraints" && (
            <Highlight>{JSON.stringify(videoTrackInfo?.constraints, null, "\t")}</Highlight>
          )}
          {tabName === "capabilities" && (
            <Highlight>{JSON.stringify(videoTrackInfo?.capabilities, null, "\t")}</Highlight>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog {...props}>
      <DialogTitle>Video Track Info</DialogTitle>
      <Typography></Typography>
      <List sx={{ pt: 0 }}>
        <ListItem>Play Start Video</ListItem>
      </List>
    </Dialog>
  );
};
