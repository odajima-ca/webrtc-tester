import CachedIcon from "@mui/icons-material/Cached";
import { List, ListItem } from "@mui/material";
import DetectRTC from "detectrtc";
import React, { FC, useCallback } from "react";

import { FallbackListItemText } from "../components/FallbackListItemText";
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
          <FallbackListItemText primary="version" secondary={DetectRTC.version} />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="os name" secondary={DetectRTC.osName} />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="os version" secondary={DetectRTC.osVersion} />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="has webcam" secondary={DetectRTC.hasWebcam} />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is apply constraints supported"
            secondary={DetectRTC.isApplyConstraintsSupported}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is audio context supported" secondary={DetectRTC.isAudioContextSupported} />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is canvas supports stream capturing"
            secondary={DetectRTC.isCanvasSupportsStreamCapturing}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is create media stream source supported"
            secondary={DetectRTC.isCreateMediaStreamSourceSupported}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is get user media supported" secondary={DetectRTC.isGetUserMediaSupported} />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is mobile device" secondary={DetectRTC.isMobileDevice} />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is multi monitor screen capturing supported"
            secondary={DetectRTC.isMultiMonitorScreenCapturingSupported}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is ortc supported" secondary={DetectRTC.isORTCSupported} />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is promises supported" secondary={DetectRTC.isPromisesSupported} />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is rtpsender replace tracks supported"
            secondary={DetectRTC.isRTPSenderReplaceTracksSupported}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is remote stream processing supported"
            secondary={DetectRTC.isRemoteStreamProcessingSupported}
          />
        </ListItem>

        <ListItem>
          <FallbackListItemText
            primary="is rtp data channels supported"
            secondary={DetectRTC.isRtpDataChannelsSupported}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is screen capturing supported"
            secondary={DetectRTC.isScreenCapturingSupported}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is sctp data channels supported"
            secondary={DetectRTC.isSctpDataChannelsSupported}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is set sink id supported" secondary={DetectRTC.isSetSinkIdSupported} />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is video supports stream capturing"
            secondary={DetectRTC.isVideoSupportsStreamCapturing}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is web rtc supported" secondary={DetectRTC.isWebRTCSupported} />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is web sockets blocked" secondary={DetectRTC.isWebSocketsBlocked} />
        </ListItem>
        <ListItem>
          <FallbackListItemText primary="is web sockets supported" secondary={DetectRTC.isWebSocketsSupported} />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is website has microphone permissions"
            secondary={DetectRTC.isWebsiteHasMicrophonePermissions}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is website has webcam permissions"
            secondary={DetectRTC.isWebsiteHasWebcamPermissions}
          />
        </ListItem>
        <ListItem>
          <FallbackListItemText
            primary="is desktop capturing supported"
            secondary={DetectRTC.isDesktopCapturingSupported}
          />
        </ListItem>
      </List>
    </AppLayout>
  );
};
