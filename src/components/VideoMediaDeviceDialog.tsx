import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React, { FC, useCallback, useState } from "react";

import { useMediaStream } from "../providers/MediaStreamProvider";
import { FullScreenDialog, FullScreenDialogProps } from "./FullScreenDialog";

export const VideoMediaDeviceDialog: FC<Omit<FullScreenDialogProps, "title" | "onSubmit">> = (props) => {
  const { videoDevices, onChangeConstraints, currentVideoDeviceId } = useMediaStream();

  const [deviceId, setDeviceId] = useState(currentVideoDeviceId);

  const onSubmit = useCallback(async () => {
    await onChangeConstraints({
      deviceId,
    });
    props.onClose?.({}, "backdropClick");
  }, [deviceId, onChangeConstraints, props]);

  if (videoDevices.length > 0) {
    return (
      <FullScreenDialog {...props} onSubmit={onSubmit} title="Video Media Devices">
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
      </FullScreenDialog>
    );
  }

  return (
    <FullScreenDialog {...props} title="Video Media Devices">
      <Typography>Play Start Video</Typography>
    </FullScreenDialog>
  );
};
