// components/WebcamFeed.tsx
import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

interface WebcamFeedProps {
  onFrame: (video: HTMLVideoElement) => void;
}

const WebcamFeed: React.FC<WebcamFeedProps> = ({ onFrame }) => {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
        const video = webcamRef.current.video as HTMLVideoElement;
        onFrame(video);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onFrame]);

  return <Webcam ref={webcamRef} />;
};

export default WebcamFeed;
