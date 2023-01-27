import { DevTool } from "@hookform/devtools";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import React, { FC, useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useMediaStream } from "../providers/MediaStreamProvider";
import { FullScreenDialog, FullScreenDialogProps } from "./FullScreenDialog";

type FormValues = Required<Pick<MediaTrackConstraintSet, "deviceId">>;

export const VideoMediaDeviceDialog: FC<Omit<FullScreenDialogProps, "title" | "onSubmit">> = (props) => {
  const { videoDevices, onChangeConstraints, currentVideoDeviceId } = useMediaStream();

  const { control, handleSubmit } = useForm<FormValues>({
    values: {
      deviceId: currentVideoDeviceId,
    },
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (values) => {
      await onChangeConstraints(values);
      props.onClose?.({}, "backdropClick");
    },
    [onChangeConstraints, props]
  );

  if (videoDevices.length > 0) {
    return (
      <FullScreenDialog {...props} title="Video Media Devices">
        <DevTool control={control} placement="top-right" />
        <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="deviceId"
            render={({ field, fieldState }) => (
              <FormControl>
                <RadioGroup {...field}>
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
            )}
          />
          <Button fullWidth={true} type="submit">
            SUBMIT
          </Button>
        </Stack>
      </FullScreenDialog>
    );
  }

  return (
    <FullScreenDialog {...props} title="Video Media Devices">
      <Typography>Play Start Video</Typography>
    </FullScreenDialog>
  );
};
