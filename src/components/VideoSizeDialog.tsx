import { DevTool } from "@hookform/devtools";
import { Button, FormControl, FormLabel, Slider, Stack, Typography } from "@mui/material";
import React, { FC, useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useMediaStream } from "../providers/MediaStreamProvider";
import { FullScreenDialog, FullScreenDialogProps } from "./FullScreenDialog";

type FormValues = Pick<MediaTrackConstraintSet, "height" | "width">;

export const VideoSizeDialog: FC<Omit<FullScreenDialogProps, "title" | "onSubmit">> = (props) => {
  const { onChangeConstraints, videoTrackInfo, supportedConstraints } = useMediaStream();

  const { control, handleSubmit } = useForm<FormValues>({
    values: {
      height: videoTrackInfo?.constraints.height ?? videoTrackInfo?.settings.height,
      width: videoTrackInfo?.constraints.width ?? videoTrackInfo?.settings.width,
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
            name="height"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.height}>
                <FormLabel>height</FormLabel>
                <Slider
                  max={videoTrackInfo?.capabilities.height?.max}
                  min={videoTrackInfo?.capabilities.height?.min}
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
            name="width"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.width}>
                <FormLabel>width</FormLabel>
                <Slider
                  max={videoTrackInfo?.capabilities.width?.max}
                  min={videoTrackInfo?.capabilities.width?.min}
                  onChange={field.onChange}
                  step={1}
                  value={Number(field.value)}
                  valueLabelDisplay="on"
                />
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
