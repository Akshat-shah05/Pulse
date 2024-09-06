import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import Webcam from 'react-webcam';

interface WebcamFeedProps {
  onFrame: (video: HTMLVideoElement) => void;
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
  username: string | null | undefined;
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>;
}

interface exerciseProps {
  username: string | null | undefined;
}

type Props = WebcamFeedProps & exerciseProps;

const WebcamFeed = ({ onFrame, setCount, count, username, setShowCanvas }: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);

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

  const startRecording = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  const turnOffWebcam = async () => {
    stopRecording();
    if (webcamRef.current && webcamRef.current.stream) {
      webcamRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsWebcamOn(false);
      setShowCanvas(false);
    }

    setCount(0);

    const response = await fetch('/api/user/updateExercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: username,
        incrementBy: count,
      }),
    });

    console.log(response);
    setShowAnalyzeButton(true);
  };

  const turnOnWebcam = () => {
    setIsWebcamOn(true);
    setShowCanvas(true);
    setRecordedChunks([]);
    setShowAnalyzeButton(false);
    startRecording();
  };

  const analyzeWorkout = async () => {
    if (recordedChunks.length === 0) return;

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', blob, 'workout.webm');

    try {
      const response = await fetch('/api/analyze/pushup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Analysis result:', result);
        // Handle the analysis result (e.g., display it to the user)
      } else {
        console.error('Failed to analyze workout');
      }
    } catch (error) {
      console.error('Error analyzing workout:', error);
    }
  };

  return (
    <div className="flex flex-col">
      {isWebcamOn ? (
        <Webcam className="rounded-lg" ref={webcamRef} />
      ) : (
        <div className="h-96 w-96 bg-background border border-primary flex flex-row justify-center items-center text-4xl rounded-lg">
          webcam off
        </div>
      )}
      <button
        onClick={isWebcamOn ? turnOffWebcam : turnOnWebcam}
        className="mt-4 bg-red-500 text-white p-2 rounded-lg"
      >
        {isWebcamOn ? 'Submit your Score!' : 'Start a New Round'}
      </button>
      {showAnalyzeButton && (
        <button
          onClick={analyzeWorkout}
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
        >
          Analyze Workout
        </button>
      )}
    </div>
  );
};

export default WebcamFeed;