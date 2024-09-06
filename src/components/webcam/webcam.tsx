import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import Webcam from 'react-webcam';

interface WebcamFeedProps {
  onFrame: (video: HTMLVideoElement) => void;
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
  username: string | null | undefined;
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ExerciseProps {
  username: string | null | undefined;
}

type Props = WebcamFeedProps & ExerciseProps;

const WebcamFeed = ({ onFrame, setCount, count, username, setShowCanvas }: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);

  useEffect(() => {
    if (isWebcamOn) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isWebcamOn]);

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
    if (webcamRef.current) {
      const stream = webcamRef.current.video?.srcObject as MediaStream;
      if (stream) {
        console.log("Starting recording...");
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: 'video/webm',
        });
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.addEventListener('stop', handleStopRecording);
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } else {
        console.error("Webcam stream is not available.");
      }
    } else {
      console.error("Webcam reference is not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      console.error("MediaRecorder is not available or already stopped.");
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setRecordedChunks(prev => [...prev, event.data]);
    }
  };

  const handleStopRecording = () => {
    // Handle the recording stop
    // You can also handle further processing or resetting recorded chunks here
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
  };

  const analyzeWorkout = async () => {
    if (recordedChunks.length === 0) {
      console.log("No video data available");
      return;
    }
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
        <Webcam
          className="rounded-lg"
          ref={webcamRef}
          onUserMedia={(stream) => console.log("Stream available")}
        />
      ) : (
        <div className="h-96 w-96 bg-background border border-primary flex flex-row justify-center items-center text-4xl rounded-lg">
          Webcam off
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
