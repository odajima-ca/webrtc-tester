import CachedIcon from "@mui/icons-material/Cached";
import { List, ListItem } from "@mui/material";
import DetectRTC from "detectrtc";
import React, { FC, useCallback } from "react";

import { ListItemText } from "../components/ListItemText";
import { AppLayout } from "../layouts/AppLayout";
import { noop } from "../utils/noop";

export const DevicePage: FC = () => {
  const loadDetectRTC = useCallback(() => {
    DetectRTC.load(noop);
  }, []);

  return (
    <AppLayout
      fab={{
        children: <CachedIcon />,
        onClick: loadDetectRTC,
      }}
    >
      <List dense={true} sx={{ width: "100%" }}>
        <ListItem>
          <ListItemText fallback="---" primary="version" secondary={DetectRTC.version} />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="os name" secondary={DetectRTC.osName} />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="os version" secondary={DetectRTC.osVersion} />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="has webcam" secondary={DetectRTC.hasWebcam} />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is apply constraints supported"
            secondary={DetectRTC.isApplyConstraintsSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is audio context supported"
            secondary={DetectRTC.isAudioContextSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is canvas supports stream capturing"
            secondary={DetectRTC.isCanvasSupportsStreamCapturing}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is create media stream source supported"
            secondary={DetectRTC.isCreateMediaStreamSourceSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is get user media supported"
            secondary={DetectRTC.isGetUserMediaSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="is mobile device" secondary={DetectRTC.isMobileDevice} />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is multi monitor screen capturing supported"
            secondary={DetectRTC.isMultiMonitorScreenCapturingSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="is ortc supported" secondary={DetectRTC.isORTCSupported} />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="is promises supported" secondary={DetectRTC.isPromisesSupported} />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is rtpsender replace tracks supported"
            secondary={DetectRTC.isRTPSenderReplaceTracksSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is remote stream processing supported"
            secondary={DetectRTC.isRemoteStreamProcessingSupported}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            fallback="---"
            primary="is rtp data channels supported"
            secondary={DetectRTC.isRtpDataChannelsSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is screen capturing supported"
            secondary={DetectRTC.isScreenCapturingSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is sctp data channels supported"
            secondary={DetectRTC.isSctpDataChannelsSupported}
          />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="is set sink id supported" secondary={DetectRTC.isSetSinkIdSupported} />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is video supports stream capturing"
            secondary={DetectRTC.isVideoSupportsStreamCapturing}
          />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="is web rtc supported" secondary={DetectRTC.isWebRTCSupported} />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="is web sockets blocked" secondary={DetectRTC.isWebSocketsBlocked} />
        </ListItem>
        <ListItem>
          <ListItemText fallback="---" primary="is web sockets supported" secondary={DetectRTC.isWebSocketsSupported} />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is website has microphone permissions"
            secondary={DetectRTC.isWebsiteHasMicrophonePermissions}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is website has webcam permissions"
            secondary={DetectRTC.isWebsiteHasWebcamPermissions}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            fallback="---"
            primary="is desktop capturing supported"
            secondary={DetectRTC.isDesktopCapturingSupported}
          />
        </ListItem>
      </List>
    </AppLayout>
  );
};
