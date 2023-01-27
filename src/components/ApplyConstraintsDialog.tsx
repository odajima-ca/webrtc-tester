import { DevTool } from "@hookform/devtools";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { FC, useCallback, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useMediaStream } from "../providers/MediaStreamProvider";
import { FullScreenDialog, FullScreenDialogProps } from "./FullScreenDialog";

type FormValues = Omit<MediaTrackConstraintSet, "sampleRate" | "sampleSize" | "suppressLocalAudioPlayback">;

const aspectRatioValues = [
  {
    height: 16,
    width: 9,
  },
  {
    height: 5,
    width: 3,
  },
  {
    height: 4,
    width: 3,
  },
  {
    height: 1,
    width: 1,
  },
  {
    height: 3,
    width: 4,
  },
  {
    height: 3,
    width: 5,
  },
  {
    height: 9,
    width: 16,
  },
];

export const ApplyConstraintsDialog: FC<Omit<FullScreenDialogProps, "title" | "onSubmit">> = (props) => {
  const { onChangeConstraints, videoTrackInfo, supportedConstraints, videoDevices } = useMediaStream();

  const initialValues = useMemo<FormValues>(
    () => ({
      aspectRatio: videoTrackInfo?.settings.aspectRatio,
      autoGainControl: videoTrackInfo?.settings.autoGainControl,
      channelCount: videoTrackInfo?.constraints.channelCount,
      deviceId: videoTrackInfo?.settings.deviceId,
      echoCancellation: videoTrackInfo?.settings.echoCancellation,
      facingMode: videoTrackInfo?.settings.facingMode,
      frameRate: videoTrackInfo?.settings.frameRate,
      groupId: videoTrackInfo?.settings.groupId,
      height: videoTrackInfo?.settings.height,
      latency: videoTrackInfo?.constraints.latency,
      noiseSuppression: videoTrackInfo?.settings.noiseSuppression,
      width: videoTrackInfo?.settings.width,
    }),
    [
      videoTrackInfo?.constraints.channelCount,
      videoTrackInfo?.constraints.latency,
      videoTrackInfo?.settings.aspectRatio,
      videoTrackInfo?.settings.autoGainControl,
      videoTrackInfo?.settings.deviceId,
      videoTrackInfo?.settings.echoCancellation,
      videoTrackInfo?.settings.facingMode,
      videoTrackInfo?.settings.frameRate,
      videoTrackInfo?.settings.groupId,
      videoTrackInfo?.settings.height,
      videoTrackInfo?.settings.noiseSuppression,
      videoTrackInfo?.settings.width,
    ]
  );

  const { control, handleSubmit } = useForm<FormValues>({
    values: initialValues,
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (values) => {
      const diffValues = _.omitBy<FormValues>(values, (value, key) => (initialValues as any)[key] === value);

      await onChangeConstraints({
        ...diffValues,
      });
      props.onClose?.({}, "backdropClick");
    },
    [initialValues, onChangeConstraints, props]
  );

  if (videoTrackInfo) {
    return (
      <FullScreenDialog {...props} title="Apply Constraints">
        <DevTool control={control} placement="top-right" />
        <Stack component="form" gap={6} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="aspectRatio"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.aspectRatio}>
                <Typography gutterBottom variant="h6">
                  aspectRatio
                </Typography>
                <TextField
                  {...field}
                  inputProps={{
                    max: videoTrackInfo.capabilities.aspectRatio?.max,
                    min: videoTrackInfo.capabilities.aspectRatio?.min,
                  }}
                  type="number"
                />
                <ButtonGroup disabled={!supportedConstraints?.aspectRatio} variant="outlined">
                  {aspectRatioValues.map(({ width, height }) => {
                    const aspectRatioValue = width / height;
                    const aspectRatioText = Math.floor(aspectRatioValue * 100) / 100;

                    return (
                      <Button onClick={() => field.onChange(aspectRatioValue)} type="button">
                        {width}:{height} ({aspectRatioText})
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="autoGainControl"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.autoGainControl}>
                <Typography gutterBottom variant="h6">
                  autoGainControl
                </Typography>
                <RadioGroup
                  onChange={(event, newValue) => {
                    field.onChange(Boolean(newValue));
                  }}
                  value={String(field.value)}
                >
                  <FormControlLabel control={<Radio />} label="true" value={true} />
                  <FormControlLabel control={<Radio />} label="false" value={false} />
                </RadioGroup>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="channelCount"
            render={({ field }) => (
              <FormControl>
                <Typography gutterBottom variant="h6">
                  channelCount
                </Typography>
                <TextField
                  {...field}
                  inputProps={{
                    max: videoTrackInfo.capabilities.channelCount?.max,
                    min: videoTrackInfo.capabilities.channelCount?.min,
                  }}
                  type="number"
                />
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="deviceId"
            render={({ field, fieldState }) => (
              <FormControl disabled={!supportedConstraints?.deviceId}>
                <Typography gutterBottom variant="h6">
                  deviceId
                </Typography>
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

          <Controller
            control={control}
            name="echoCancellation"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.echoCancellation}>
                <Typography gutterBottom variant="h6">
                  echoCancellation
                </Typography>
                <RadioGroup
                  onChange={(event, newValue) => {
                    field.onChange(Boolean(newValue));
                  }}
                  value={String(field.value)}
                >
                  <FormControlLabel control={<Radio />} label="true" value={true} />
                  <FormControlLabel control={<Radio />} label="false" value={false} />
                </RadioGroup>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="noiseSuppression"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.noiseSuppression}>
                <Typography gutterBottom variant="h6">
                  noiseSuppression
                </Typography>
                <RadioGroup
                  onChange={(event, newValue) => {
                    field.onChange(Boolean(newValue));
                  }}
                  value={String(field.value)}
                >
                  <FormControlLabel control={<Radio />} label="true" value={true} />
                  <FormControlLabel control={<Radio />} label="false" value={false} />
                </RadioGroup>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="facingMode"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.facingMode}>
                <Typography gutterBottom variant="h6">
                  facingMode
                </Typography>
                <RadioGroup {...field}>
                  {videoTrackInfo?.capabilities.facingMode?.map((facingMode, index) => (
                    <FormControlLabel control={<Radio />} key={index} label={facingMode} value={facingMode} />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="frameRate"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.frameRate}>
                <Typography gutterBottom variant="h6">
                  frameRate
                </Typography>
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
            name="height"
            render={({ field }) => (
              <FormControl disabled={!supportedConstraints?.height}>
                <Typography gutterBottom variant="h6">
                  height
                </Typography>
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
                <Typography gutterBottom variant="h6">
                  height
                </Typography>
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

          <Controller
            control={control}
            name="latency"
            render={({ field }) => (
              <FormControl>
                <Typography gutterBottom variant="h6">
                  latency
                </Typography>
                <Slider
                  max={videoTrackInfo?.capabilities.latency?.max}
                  min={videoTrackInfo?.capabilities.latency?.min}
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
