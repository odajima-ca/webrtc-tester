import { Dialog, DialogProps, DialogTitle, List, ListItem, Typography } from "@mui/material";
import React, { FC } from "react";

import { useMediaStream } from "../providers/MediaStreamProvider";
import { FallbackListItemText } from "./FallbackListItemText";

export const SupportedConstraintsDialog: FC<DialogProps> = (props) => {
  const { supportedConstraints } = useMediaStream();

  if (supportedConstraints) {
    return (
      <Dialog {...props}>
        <DialogTitle>Supported Constraints</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem>
            <FallbackListItemText primary="Aspect ratio" secondary={supportedConstraints?.aspectRatio} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="Auto gain control" secondary={supportedConstraints?.autoGainControl} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="Device id" secondary={supportedConstraints?.deviceId} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="Echo cancellation" secondary={supportedConstraints?.echoCancellation} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="Facing mode" secondary={supportedConstraints?.facingMode} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="Frame rate" secondary={supportedConstraints?.frameRate} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="is web sockets supported" secondary={supportedConstraints?.groupId} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="is web sockets supported" secondary={supportedConstraints?.height} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="Noise suppression" secondary={supportedConstraints?.noiseSuppression} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="Sample rate" secondary={supportedConstraints?.sampleRate} />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="Sample size" secondary={supportedConstraints?.sampleSize} />
          </ListItem>
          <ListItem>
            <FallbackListItemText
              primary="Suppress local audio playback"
              secondary={supportedConstraints?.suppressLocalAudioPlayback}
            />
          </ListItem>
          <ListItem>
            <FallbackListItemText primary="is web sockets supported" secondary={supportedConstraints?.width} />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  return (
    <Dialog {...props}>
      <DialogTitle>Supported Constraints</DialogTitle>
      <Typography></Typography>
      <List sx={{ pt: 0 }}>
        <ListItem>Play Start Video</ListItem>
      </List>
    </Dialog>
  );
};
