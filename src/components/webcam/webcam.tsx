import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import Webcam from 'react-webcam';

// Define the props interface for the WebcamFeed component
interface WebcamFeedProps {
  onFrame: (video: HTMLVideoElement) => void; // Function to handle the video frame
  setCount: Dispatch<SetStateAction<number>>; // Function to update the count state
  count: number; // Current count value
  username: string | null | undefined; // Username of the user or friend
}

// Define the props interface for pushup-related properties
interface pushupProps {
  username: string | null | undefined; // Username of the user or friend
}

// Combine both props interfaces into a single Props type
type Props = WebcamFeedProps & pushupProps

// WebcamFeed component definition
const WebcamFeed = ({ onFrame, setCount, count, username }: Props) => {
  // Reference to the Webcam component
  const webcamRef = useRef<Webcam>(null);
  
  // State to track whether the webcam is on or off
  const [isWebcamOn, setIsWebcamOn] = useState(true);

  // Effect hook to handle frame capture when the webcam is on
  useEffect(() => {
    // If the webcam is off, exit early
    if (!isWebcamOn) return;

    // Set up an interval to periodically check the video stream
    const interval = setInterval(() => {
      // Check if the webcam reference is valid and the video is ready
      if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
        const video = webcamRef.current.video as HTMLVideoElement;
        onFrame(video); // Call the onFrame function with the current video element
      }
    }, 100); // Check every 100 milliseconds

    // Cleanup the interval on component unmount or when the webcam state changes
    return () => clearInterval(interval);
  }, [onFrame, isWebcamOn]);

  // Function to turn off the webcam and submit the exercise data
  const turnOffWebcam = async () => {
    // Stop all tracks in the webcam stream to turn off the webcam
    if (webcamRef.current && webcamRef.current.stream) {
      webcamRef.current.stream.getTracks().forEach(track => track.stop());
      setIsWebcamOn(false); // Update the state to indicate the webcam is off
    }

    setCount(0); // Reset the count to 0

    // Make a POST request to update the exercise data on the server
    const response = await fetch('/api/user/updateExercise', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: username, // Username of the user whose exercise data is being updated
        incrementBy: count // The count of exercises performed
      })
    });

    // Log the server response for debugging purposes
    console.log(response);
  };

  // Function to turn on the webcam
  const turnOnWebcam = () => {
    setIsWebcamOn(true); // Update the state to indicate the webcam is on
  };

  // Render the webcam feed or a placeholder depending on the webcam state
  return (
    <div className="flex flex-col">
      {isWebcamOn ? (
        // Display the webcam feed if the webcam is on
        <Webcam className="rounded-lg" ref={webcamRef} />
      ) : (
        // Display a placeholder when the webcam is off
        <div className="h-96 w-96 bg-background border border-primary flex flex-row justify-center items-center text-4xl rounded-lg">
          webcam off
        </div>
      )}
      {/* Button to toggle between turning the webcam on and off */}
      <button onClick={isWebcamOn ? turnOffWebcam : turnOnWebcam} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
        {isWebcamOn ? "Submit your Score!" : "Start a New Round"}
      </button>
    </div>
  );
};

export default WebcamFeed;
