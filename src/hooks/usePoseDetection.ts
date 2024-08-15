// Import React hooks and TensorFlow.js libraries
import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

// Custom hook to handle pose detection
const usePoseDetection = () => {
  // Initialize state to store the pose detector instance
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);

  // Effect hook to load the TensorFlow model and set up the pose detector
  useEffect(() => {
    // Async function to load the model and create the detector
    const loadModel = async () => {
      // Wait for TensorFlow.js to be ready
      await tf.ready();

      // Set the TensorFlow.js backend to WebGL for better performance
      await tf.setBackend('webgl');

      // Define the pose detection model and configuration
      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };

      // Create the pose detector instance
      const detector = await poseDetection.createDetector(model, detectorConfig);

      // Store the detector instance in the state
      setDetector(detector);
    };

    // Call the loadModel function to start loading the model
    loadModel();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to detect poses in the given video element
  const detectPose = async (video: HTMLVideoElement): Promise<poseDetection.Pose[]> => {
    // Check if the detector is available
    if (detector) {
      // Estimate poses from the video element and return them
      const poses = await detector.estimatePoses(video);
      return poses;
    }
    // Return an empty array if the detector is not available
    return [];
  };

  // Return the detectPose function for use in other components
  return detectPose;
};

export default usePoseDetection;
