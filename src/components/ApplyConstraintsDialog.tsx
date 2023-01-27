import { DevTool } from "@hookform/devtools";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useMediaStream } from "../providers/MediaStreamProvider";
import { FullScreenDialog, FullScreenDialogProps } from "./FullScreenDialog";

type FormValues = Omit<
  MediaTrackConstraintSet,
  | "deviceId"
  | "channelCount"
  | "facingMode"
  | "height"
  | "width"
  | "sampleRate"
  | "sampleSize"
  | "suppressLocalAudioPlayback"
>;

export const ApplyConstraintsDialog: FC<Omit<FullScreenDialogProps, "title" | "onSubmit">> = (props) => {
  const { onChangeConstraints, videoTrackInfo, supportedConstraints } = useMediaStream();

  const { control, handleSubmit } = useForm<FormValues>({
    values: {
      aspectRatio: videoTrackInfo?.constraints.aspectRatio ?? videoTrackInfo?.settings.aspectRatio,
      autoGainControl: videoTrackInfo?.constraints.autoGainControl ?? videoTrackInfo?.settings.autoGainControl,
      echoCancellation: videoTrackInfo?.constraints.echoCancellation ?? videoTrackInfo?.settings.echoCancellation,
      frameRate: videoTrackInfo?.constraints.frameRate ?? videoTrackInfo?.settings.frameRate,
      groupId: videoTrackInfo?.constraints.groupId ?? videoTrackInfo?.settings.groupId,
      latency: videoTrackInfo?.constraints.latency,
      noiseSuppression: videoTrackInfo?.constraints.noiseSuppression ?? videoTrackInfo?.settings.noiseSuppression,
    },
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (values) => {
      await onChangeConstraints(values);
      props.onClose?.({}, "backdropClick");
    },
    [onChangeConstraints, props]
  );

  if (videoTrackInfo) {
    return (
      <FullScreenDialog {...props} title="Apply Constraints">
        <DevTool control={control} placement="top-right" />
        <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="aspectRatio"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.aspectRatio}>
                <TextField
                  {...field}
                  inputProps={{
                    max: videoTrackInfo?.capabilities.aspectRatio?.max,
                    min: videoTrackInfo?.capabilities.aspectRatio?.min,
                  }}
                  label="aspectRatio"
                  type="number"
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="autoGainControl"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.autoGainControl}>
                <FormControlLabel control={<Checkbox {...field} checked={!!field.value} />} label="autoGainControl" />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="frameRate"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.frameRate}>
                <FormLabel>frameRate</FormLabel>
                <Slider
                  max={videoTrackInfo?.capabilities.frameRate?.max}
                  min={videoTrackInfo?.capabilities.frameRate?.min}
                  onChange={field.onChange}
                  step={1}
                  value={Number(field.value)}
                  valueLabelDisplay="on"
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="noiseSuppression"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.noiseSuppression}>
                <FormControlLabel control={<Checkbox {...field} checked={!!field.value} />} label="noiseSuppression" />
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
    <FullScreenDialog {...props} title="Apply Constraints">
      <Typography>Play Start Video</Typography>
    </FullScreenDialog>
  );
};
