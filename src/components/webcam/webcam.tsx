// components/WebcamFeed.tsx
import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import Webcam from 'react-webcam';

interface WebcamFeedProps {
  onFrame: (video: HTMLVideoElement) => void;
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
  username: string | null | undefined;
}

interface pushupProps {
  username: string | null | undefined;
}

type Props = WebcamFeedProps & pushupProps


const WebcamFeed= ({ onFrame, setCount, count, username }: Props) => {
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

    const response = await fetch('/api/user/updateExercise', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: username, // username of the friend that you are adding from input
        incrementBy: count // username received as props, current session username
      })
    })

    console.log(response)
  };

  const turnOnWebcam = () => {
    setIsWebcamOn(true);
  };

  return (
    <div className="flex flex-col">
      {isWebcamOn ? (
        <Webcam className="rounded-lg" ref={webcamRef} />
      ) : (
        <div className="h-96 w-96 bg-background border border-primary flex flex-row justify-center items-center text-4xl rounded-lg">webcam off</div>
      )}
      <button onClick={isWebcamOn ? turnOffWebcam : turnOnWebcam} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
        {isWebcamOn ? "Submit you Score!" : "Start a New Round"}
      </button>
    </div>
  );
};

export default WebcamFeed;
