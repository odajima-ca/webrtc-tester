import { List, ListItem } from "@mui/material";
import {
  isDesktopCapturingSupported,
  isGetUserMediaSupported,
  isMobileDevice,
  isMultiMonitorScreenCapturingSupported,
  isORTCSupported,
  isPromisesSupported,
  isRemoteStreamProcessingSupported,
  isRtpDataChannelsSupported,
  isRTPSenderReplaceTracksSupported,
  isScreenCapturingSupported,
  isSctpDataChannelsSupported,
  isSetSinkIdSupported,
  isVideoSupportsStreamCapturing,
  isWebRTCSupported,
  isWebsiteHasMicrophonePermissions,
  isWebsiteHasWebcamPermissions,
  isWebSocketsBlocked,
  isWebSocketsSupported,
} from "detectrtc";
import { FC } from "react";

import { ListItemText } from "../components/ListItemText";
import { useDetectRTC } from "../hooks/useDetectRTC";

export const DevicePage: FC = () => {
  const detectRTC = useDetectRTC();

  return (
    <List dense={true} sx={{ width: "100%" }}>
      <ListItem>
        <ListItemText fallback="---" primary="version" secondary={detectRTC?.version} />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="os name" secondary={detectRTC?.osName} />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="os version" secondary={detectRTC?.osVersion} />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="has webcam" secondary={detectRTC?.hasWebcam} />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is apply constraints supported"
          secondary={detectRTC?.isApplyConstraintsSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is audio context supported"
          secondary={detectRTC?.isAudioContextSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is canvas supports stream capturing"
          secondary={detectRTC?.isCanvasSupportsStreamCapturing}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is create media stream source supported"
          secondary={detectRTC?.isCreateMediaStreamSourceSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is get user media supported"
          secondary={detectRTC?.isGetUserMediaSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="is mobile device" secondary={detectRTC?.isMobileDevice} />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is multi monitor screen capturing supported"
          secondary={detectRTC?.isMultiMonitorScreenCapturingSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="is ortc supported" secondary={detectRTC?.isORTCSupported} />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="is promises supported" secondary={detectRTC?.isPromisesSupported} />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is rtpsender replace tracks supported"
          secondary={detectRTC?.isRTPSenderReplaceTracksSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is remote stream processing supported"
          secondary={detectRTC?.isRemoteStreamProcessingSupported}
        />
      </ListItem>

      <ListItem>
        <ListItemText
          fallback="---"
          primary="is rtp data channels supported"
          secondary={detectRTC?.isRtpDataChannelsSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is screen capturing supported"
          secondary={detectRTC?.isScreenCapturingSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is sctp data channels supported"
          secondary={detectRTC?.isSctpDataChannelsSupported}
        />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="is set sink id supported" secondary={detectRTC?.isSetSinkIdSupported} />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is video supports stream capturing"
          secondary={detectRTC?.isVideoSupportsStreamCapturing}
        />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="is web rtc supported" secondary={detectRTC?.isWebRTCSupported} />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="is web sockets blocked" secondary={detectRTC?.isWebSocketsBlocked} />
      </ListItem>
      <ListItem>
        <ListItemText fallback="---" primary="is web sockets supported" secondary={detectRTC?.isWebSocketsSupported} />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is website has microphone permissions"
          secondary={detectRTC?.isWebsiteHasMicrophonePermissions}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is website has webcam permissions"
          secondary={detectRTC?.isWebsiteHasWebcamPermissions}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          fallback="---"
          primary="is desktop capturing supported"
          secondary={detectRTC?.isDesktopCapturingSupported}
        />
      </ListItem>
    </List>
  );
};
