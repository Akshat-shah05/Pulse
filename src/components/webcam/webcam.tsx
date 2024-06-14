// components/WebcamFeed.tsx
import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import Webcam from 'react-webcam';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

interface WebcamFeedProps {
  onFrame: (video: HTMLVideoElement) => void;
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
}


const WebcamFeed: React.FC<WebcamFeedProps> = ({ onFrame, setCount, count }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamOn, setIsWebcamOn] = useState(true);

  useEffect(() => {
    if (!isWebcamOn) return;

    const interval = setInterval(() => {
      if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
        const video = webcamRef.current.video as HTMLVideoElement;
        onFrame(video);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onFrame, isWebcamOn]);

  const turnOffWebcam = async () => {
    if (webcamRef.current && webcamRef.current.stream) {
      webcamRef.current.stream.getTracks().forEach(track => track.stop());
      setIsWebcamOn(false);
    }
    setCount(0);
  };

  const turnOnWebcam = () => {
    setIsWebcamOn(true);
  };

  return (
    <div className="flex flex-col">
      {isWebcamOn ? (
        <Webcam className="rounded-lg" ref={webcamRef} />
      ) : (
        <div className="h-96 w-96 bg-gray-500 rounded-lg">webcam off</div>
      )}
      <button onClick={isWebcamOn ? turnOffWebcam : turnOnWebcam} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
        {isWebcamOn ? "Submit you Score!" : "Start a New Round"}
      </button>
    </div>
  );
};

export default WebcamFeed;
