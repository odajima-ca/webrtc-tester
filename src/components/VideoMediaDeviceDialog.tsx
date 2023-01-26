import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { FC, useCallback, useState } from "react";

import { useMediaStream } from "../providers/MediaStreamProvider";

export const VideoMediaDeviceDialog: FC<DialogProps> = (props) => {
  const { videoDevices, onChangeConstraints, currentVideoDeviceId } = useMediaStream();

  const [deviceId, setDeviceId] = useState(currentVideoDeviceId);

  const onSubmit = useCallback(async () => {
    await onChangeConstraints({
      deviceId,
    });
  }, [deviceId, onChangeConstraints]);

  if (videoDevices.length > 0) {
    return (
      <Dialog {...props}>
        <DialogTitle>Video Media Devices</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              defaultValue={currentVideoDeviceId}
              onChange={(event, value) => {
                setDeviceId(value);
              }}
            >
              {videoDevices.map((videoDevice, index) => (
                <FormControlLabel
                  control={<Radio />}
                  key={index}
                  label={videoDevice.label}
                  value={videoDevice.deviceId}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={onSubmit} variant="outlined">
            Change video device
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog {...props}>
      <DialogTitle>Video Media Devices</DialogTitle>
      <Typography></Typography>
      <List sx={{ pt: 0 }}>
        <ListItem>Play Start Video</ListItem>
      </List>
    </Dialog>
  );
};
