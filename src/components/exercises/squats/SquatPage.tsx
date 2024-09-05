'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react'; 
import WebcamFeed from '@/components/webcam/webcam';
import Navbar2 from '@/components/navbar2/Navbar2';
import usePoseDetection from '@/hooks/usePoseDetection'; 
import { Pose } from '@tensorflow-models/pose-detection'; 
import * as tf from '@tensorflow/tfjs';

// Function to determine if the current pose is a squat
const isSquat = (pose: Pose[]): boolean => {
  if (pose.length > 0) {
    const keypoints = pose[0].keypoints;
    const leftHip = keypoints.find(point => point.name === 'left_hip');
    const rightHip = keypoints.find(point => point.name === 'right_hip');
    const leftKnee = keypoints.find(point => point.name === 'left_knee');
    const rightKnee = keypoints.find(point => point.name === 'right_knee');

    if (leftHip && rightHip && leftKnee && rightKnee) {
      const isUpPosition = leftHip.y > leftKnee.y && rightHip.y > rightKnee.y;
      const isDownPosition = leftHip.y < leftKnee.y && rightHip.y < rightKnee.y;
      return isDownPosition && isUpPosition;
    }
  }
  return false;
};

// Function to draw keypoints and skeleton (green lines)
const drawPose = (ctx: CanvasRenderingContext2D, pose: Pose[]) => {
  if (pose.length > 0) {
    const keypoints = pose[0].keypoints;

    // Draw keypoints
    keypoints.forEach(point => {
      const pointScore = point.score ?? 0; // Use 0 as default score if undefined
      if (pointScore > 0.5) { // Draw only if score is high enough
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw a circle for the keypoint
        ctx.fillStyle = 'green';
        ctx.fill();
      }
    });

    // Draw skeleton (lines between specific keypoints)
    const adjacentKeyPoints = [
      ['left_shoulder', 'left_elbow'], ['left_elbow', 'left_wrist'],
      ['right_shoulder', 'right_elbow'], ['right_elbow', 'right_wrist'],
      ['left_hip', 'left_knee'], ['left_knee', 'left_ankle'],
      ['right_hip', 'right_knee'], ['right_knee', 'right_ankle'],
      ['left_shoulder', 'right_shoulder'], ['left_hip', 'right_hip'],
    ];

    adjacentKeyPoints.forEach(([pointAName, pointBName]) => {
      const pointA = keypoints.find(point => point.name === pointAName);
      const pointB = keypoints.find(point => point.name === pointBName);

      const pointAScore = pointA?.score ?? 0; // Safe access with default score
      const pointBScore = pointB?.score ?? 0; // Safe access with default score

      if (pointA && pointB && pointAScore > 0.5 && pointBScore > 0.5) {
        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }
};

// Main component for tracking squats
const SquatPage = ({ username }: { username: string | null | undefined }) => {
  const detectPose = usePoseDetection();
  const [count, setCount] = useState(0); 
  const [isDown, setIsDown] = useState(false); 
  const [frameCount, setFrameCount] = useState(0);
  const [showCanvas, setShowCanvas] = useState(true); // Canvas toggle
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas ref

  const IGNORE_FRAMES = 10;

  useEffect(() => {
    const initializeTf = async () => {
      await tf.ready();
    };
    initializeTf();
  }, []);

  const handleFrame = useCallback(async (video: HTMLVideoElement) => {
    setFrameCount(prev => prev + 1);
    if (frameCount < IGNORE_FRAMES) {
      return;
    }

    const poses = await detectPose(video);
    const squatState = isSquat(poses);

    if (squatState) {
      if (!isDown) {
        setIsDown(true);
      }
    } else {
      if (isDown) {
        setCount(prevCount => prevCount + 1);
        setIsDown(false);
      }
    }

    // Draw pose on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
        drawPose(ctx, poses); // Draw keypoints and skeleton
      }
    }
  }, [detectPose, isDown, frameCount]);

  return (
    <>
      <Navbar2 />
      <div className="flex flex-col justify-center items-center bg-background h-screen w-full pb-40 text-primary">
        <h1 className="pb-10">Squat Counter: {count}</h1>
        <div className="relative">
          <WebcamFeed onFrame={handleFrame} setCount={setCount} count={count} username={username} setShowCanvas={setShowCanvas} />
          {showCanvas && <canvas ref={canvasRef} className="absolute top-0 left-0" width="640" height="480" />}
        </div>
      </div>
    </>
  );
};

export default SquatPage;
