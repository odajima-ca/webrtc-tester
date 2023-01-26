import React, {
  createContext,
  FC,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { useBooleanState } from "../hooks/useBooleanState";
import { noop, VoidOrPromiseFunction } from "../utils/noop";
import { useSnackbar } from "./SnackbarProvider";

type MediaStreamContextValue = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  startMediaStream: VoidOrPromiseFunction;
  stopMediaStream: VoidOrPromiseFunction;
  supportedConstraints?: MediaTrackSupportedConstraints;
  mediaDevices: MediaDeviceInfo[];
  videoDevices: MediaDeviceInfo[];
  currentVideoDeviceId: string;
  isVideoPlayed: boolean;
  onChangeConstraints: MediaStreamTrack["applyConstraints"];
  videoTrackInfo:
    | {
        capabilities: MediaTrackCapabilities;
        constraints: MediaTrackConstraints;
        settings: MediaTrackSettings;
      }
    | undefined;
};

const MediaStreamContext = createContext<MediaStreamContextValue>({
  currentVideoDeviceId: "",
  isVideoPlayed: false,
  mediaDevices: [],
  onChangeConstraints: noop as MediaStreamTrack["applyConstraints"],
  startMediaStream: noop,
  stopMediaStream: noop,
  supportedConstraints: undefined,
  videoDevices: [],
  videoRef: { current: null },
  videoTrackInfo: undefined,
});

export const MediaStreamProvider: FC<PropsWithChildren> = ({ children }) => {
  const { showSnack } = useSnackbar();

  const [mediaDevices, setMediaDevices] = useState<MediaStreamContextValue["mediaDevices"]>([]);

  const [videoDevices, setVideoDevices] = useState<MediaStreamContextValue["videoDevices"]>([]);

  const [currentVideoDeviceId, setCurrentVideoDeviceId] = useState("");

  const [supportedConstraints, setSupportedConstraints] = useState<MediaStreamContextValue["supportedConstraints"]>();

  const [videoTrackInfo, setVideoTrackInfo] = useState<MediaStreamContextValue["videoTrackInfo"]>();

  const {
    isTruthy: isVideoPlayed,
    onTruthy: playVideoState,
    onFalsy: stopVideoState,
  } = useBooleanState({ isTruthy: false });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startMediaStream = useCallback(async () => {
    try {
      const video = videoRef.current;
      if (!video) return;

      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      video.muted = true;
      video.volume = 0;
      video.setAttribute("playsinline", "playsinline");
      video.srcObject = mediaStream;
      await video.play();
      playVideoState();

      setSupportedConstraints(navigator.mediaDevices.getSupportedConstraints());

      const newMediaDevices = await navigator.mediaDevices.enumerateDevices();
      setMediaDevices(newMediaDevices);
      setVideoDevices(newMediaDevices.filter((device) => device.kind === "videoinput"));

      const videoTrack = mediaStream.getVideoTracks()[0];
      setCurrentVideoDeviceId(videoTrack?.getSettings().deviceId || "");

      const settings = videoTrack.getSettings();
      const constraints = videoTrack.getConstraints();
      const capabilities = videoTrack.getCapabilities();
      setVideoTrackInfo({
        capabilities,
        constraints,
        settings,
      });

      showSnack({
        message: "Start Media Stream",
        security: "info",
      });
    } catch (error: any) {
      showSnack({
        message: error.toString(),
        security: "error",
      });
    }
  }, [playVideoState, setCurrentVideoDeviceId, showSnack]);

  const stopMediaStream = useCallback(() => {
    try {
      const video = videoRef.current;
      if (!video) return;

      const mediaStream = video.srcObject as MediaStream;
      mediaStream?.getTracks().forEach((track) => {
        track.stop();
      });
      video.srcObject = null;

      stopVideoState();

      showSnack({
        message: "Stop Media Stream",
        security: "info",
      });
    } catch (error: any) {
      showSnack({
        message: error.toString(),
        security: "error",
      });
    }
  }, [videoRef, stopVideoState, showSnack]);

  const onChangeConstraints = useCallback<MediaStreamContextValue["onChangeConstraints"]>(
    async (constraints) => {
      try {
        const video = videoRef.current;
        if (!video) return;

        const mediaStream = video.srcObject as MediaStream;
        const videoTrack = mediaStream.getVideoTracks()[0];

        if (!videoTrack) return;

        await videoTrack?.applyConstraints(constraints);

        showSnack({
          message: "Apply Constraints",
          security: "info",
        });
      } catch (error: any) {
        showSnack({
          message: error.toString(),
          security: "error",
        });
      }
    },
    [showSnack]
  );

  const value = useMemo(
    () => ({
      currentVideoDeviceId,
      isVideoPlayed,
      mediaDevices,
      onChangeConstraints,
      startMediaStream,
      stopMediaStream,
      supportedConstraints,
      videoDevices,
      videoRef,
      videoTrackInfo,
    }),
    [
      currentVideoDeviceId,
      isVideoPlayed,
      mediaDevices,
      onChangeConstraints,
      startMediaStream,
      stopMediaStream,
      supportedConstraints,
      videoDevices,
      videoTrackInfo,
    ]
  );

  return <MediaStreamContext.Provider value={value}>{children}</MediaStreamContext.Provider>;
};

export const useMediaStream = () => useContext(MediaStreamContext);
