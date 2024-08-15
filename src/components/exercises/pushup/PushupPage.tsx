'use client'; 

import React, { useState, useCallback, useEffect } from 'react'; 
import WebcamFeed from '@/components/webcam/webcam';
import Navbar2 from '@/components/navbar2/Navbar2';
import usePoseDetection from '@/hooks/usePoseDetection'; 
import { Pose } from '@tensorflow-models/pose-detection'; 
import * as tf from '@tensorflow/tfjs';

// Function to determine if the current pose is a pushup
const isPushup = (pose: Pose[]): boolean => {
  // Check if any pose data is available
  if (pose.length > 0) {
    const keypoints = pose[0].keypoints; // Get keypoints from the first detected pose
    // Find specific keypoints
    const nose = keypoints.find(point => point.name === 'nose');
    const leftWrist = keypoints.find(point => point.name === 'left_wrist');
    const rightWrist = keypoints.find(point => point.name === 'right_wrist');
    const leftAnkle = keypoints.find(point => point.name === 'left_ankle');
    const rightAnkle = keypoints.find(point => point.name === 'right_ankle');

    // Check if all required keypoints are found
    if (nose && leftWrist && rightWrist && leftAnkle && rightAnkle) {
      const isDownPosition = nose.y > leftWrist.y && nose.y > rightWrist.y;       // Determine if the user is in the down position
      const isUpPosition = leftAnkle.y < nose.y && rightAnkle.y < nose.y;      // Determine if the user is in the up position
      return isDownPosition && isUpPosition;                                 // Return true if both conditions are met
    }
  }
  return false; 
};

// Define the props interface for the PushUpPage component
interface pushupProps {
  username: string | null | undefined; // The username of the current user
}

// Main component for tracking pushups
const PushUpPage = ({ username }: pushupProps) => {
  const detectPose = usePoseDetection(); // Hook for detecting poses from video feed
  const [count, setCount] = useState(0); 
  const [isDown, setIsDown] = useState(false); 
  const [frameCount, setFrameCount] = useState(0);
  const IGNORE_FRAMES = 10; // Number of initial frames to ignore for stabilization

  // Effect hook to initialize TensorFlow.js
  useEffect(() => {
    const initializeTf = async () => {
      await tf.ready(); // Ensure TensorFlow.js is ready before using it
    };

    initializeTf(); // Call the function to initialize TensorFlow.js
  }, []); // Empty dependency array means this runs only once on componentDidMount

  // Callback function to handle each frame from the video feed
  const handleFrame = useCallback(async (video: HTMLVideoElement) => {
    setFrameCount(prev => prev + 1); // Increment the frame count
    if (frameCount < IGNORE_FRAMES) {
      return; // Skip the first few frames for stabilization
    }

    // Get the poses from the video feed
    const poses = await detectPose(video);
    // Determine if the detected pose is a pushup
    const pushupState = isPushup(poses);

    // Update pushup count based on the pose state
    if (pushupState) {
      if (!isDown) {
        setIsDown(true); // Update state to indicate that the user is in the down position
      }
    } else {
      if (isDown) {
        setCount(prevCount => prevCount + 1); // Increment the pushup count
        setIsDown(false); // Update state to indicate that the user is back in the up position
      }
    }
  }, [detectPose, isDown, frameCount]); // Dependencies include detectPose, isDown, and frameCount

  // Render the component
  return (
    <>
      <Navbar2 /> {/* Render the navigation bar */}
      <div className="flex flex-col justify-center items-center bg-background h-screen w-full pb-40 text-primary">
        <h1 className="pb-10">Pushup Counter: {count}</h1> {/* Display the pushup count */}
        <WebcamFeed onFrame={handleFrame} setCount={setCount} count={count} username={username} /> {/* Render the WebcamFeed component */}
      </div>
    </>
  );
};

export default PushUpPage; // Export the component for use in other parts of the application
