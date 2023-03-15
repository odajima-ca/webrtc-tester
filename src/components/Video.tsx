import React from "react";

export type VideoRef = HTMLVideoElement;

export type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement>;

export const Video = React.forwardRef<VideoRef, VideoProps>((props, ref) => (
  <video
    onAbort={(event) => {
      // console.log("onAbort", event);
    }}
    onCanPlay={(event) => {
      // console.log("onCanPlay", event);
    }}
    onCanPlayThrough={(event) => {
      // console.log("onCanPlayThrough", event);
    }}
    onDurationChange={(event) => {
      // console.log("onDurationChange", event);
    }}
    onEmptied={(event) => {
      // console.log("onEmptied", event);
    }}
    onEnded={(event) => {
      // console.log("onEnded", event);
    }}
    onError={(event) => {
      // console.log("onError", event);
    }}
    onLoadedData={(event) => {
      // console.log("onLoadedData", event);
    }}
    onLoadedMetadata={(event) => {
      // console.log("onLoadedMetadata", event);
    }}
    onPause={(event) => {
      // console.log("onPause", event);
    }}
    onPlay={(event) => {
      // console.log("onPlay", event);
    }}
    onPlaying={(event) => {
      // console.log("onPlaying", event);
    }}
    onProgress={(event) => {
      // console.log("onProgress", event);
    }}
    onRateChange={(event) => {
      // console.log("onRateChange", event);
    }}
    onSeeked={(event) => {
      // console.log("onSeeked", event);
    }}
    onSeeking={(event) => {
      // console.log("onSeeking", event);
    }}
    onStalled={(event) => {
      // console.log("onStalled", event);
    }}
    onSuspend={(event) => {
      // console.log("onSuspend", event);
    }}
    onTimeUpdate={(event) => {
      // console.log("onTimeUpdate", event);
    }}
    onVolumeChange={(event) => {
      // console.log("onVolumeChange", event);
    }}
    onWaiting={(event) => {
      // console.log("onWaiting", event);
    }}
    ref={ref}
    {...props}
  />
));
