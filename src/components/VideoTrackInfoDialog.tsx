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

import { useMediaStream } from "../providers/MediaStreamProvider";
import { FallbackListItemText } from "./FallbackListItemText";

export const VideoTrackInfoDialog: FC<DialogProps> = (props) => {
  const { videoTrackInfo } = useMediaStream();

  const [tabName, setTabName] = useState("settings");

  if (videoTrackInfo) {
    return (
      <Dialog {...props}>
        <DialogTitle>Video Track Info</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
          {tabName === "settings" && <Box component="pre">{JSON.stringify(videoTrackInfo?.settings, null, "\t")}</Box>}
          {tabName === "constraints" && (
            <Box component="pre">{JSON.stringify(videoTrackInfo?.constraints, null, "\t")}</Box>
          )}
          {tabName === "capabilities" && (
            <Box component="pre">{JSON.stringify(videoTrackInfo?.capabilities, null, "\t")}</Box>
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
