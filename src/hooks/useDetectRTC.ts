import DetectRTC from "detectrtc";
import { useEffect, useState } from "react";

export const useDetectRTC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    DetectRTC.load(() => {
      setIsLoaded(true);
    });
  }, []);

  if (isLoaded) {
    return DetectRTC;
  }

  return null;
};
