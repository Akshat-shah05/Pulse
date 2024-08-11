'use client'
import React, { useState, useCallback, useEffect } from 'react';
import WebcamFeed from '@/components/webcam/webcam';
import Navbar2 from '@/components/navbar2/Navbar2';
import usePoseDetection from '@/hooks/usePoseDetection';
import { Pose } from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';

const isPushup = (pose: Pose[]): boolean => {
  if (pose.length > 0) {
    const keypoints = pose[0].keypoints;
    const nose = keypoints.find(point => point.name === 'nose');
    const leftWrist = keypoints.find(point => point.name === 'left_wrist');
    const rightWrist = keypoints.find(point => point.name === 'right_wrist');
    const leftAnkle = keypoints.find(point => point.name === 'left_ankle');
    const rightAnkle = keypoints.find(point => point.name === 'right_ankle');

    if (nose && leftWrist && rightWrist && leftAnkle && rightAnkle) {
      const isDownPosition = nose.y > leftWrist.y && nose.y > rightWrist.y;
      const isUpPosition = leftAnkle.y < nose.y && rightAnkle.y < nose.y;
      return isDownPosition && isUpPosition;
    }
  }
  return false;
};

interface pushupProps {
  username: string | null | undefined;
}

const PushUpPage = ({username}: pushupProps) => {
  const detectPose = usePoseDetection();
  const [count, setCount] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const IGNORE_FRAMES = 10; // Number of initial frames to ignore

  useEffect(() => {
    const initializeTf = async () => {
      await tf.ready();
    };

    initializeTf();
  }, []);

  const handleFrame = useCallback(async (video: HTMLVideoElement) => {
    setFrameCount(prev => prev + 1);
    if (frameCount < IGNORE_FRAMES) {
      return; // Ignore the first few frames
    }

    const poses = await detectPose(video);
    const pushupState = isPushup(poses);

    if (pushupState) {
      if (!isDown) {
        setIsDown(true);
      }
    } else {
      if (isDown) {
        setCount(prevCount => prevCount + 1);
        setIsDown(false);
      }
    }
  }, [detectPose, isDown, frameCount]);

  return (
    <>
      <Navbar2 />
      <div className="flex flex-col justify-center items-center bg-background h-screen w-full pb-40 text-primary">
        <h1 className="pb-10">Pushup Counter: {count}</h1>
        <WebcamFeed onFrame={handleFrame} setCount={setCount} count={count} username={username}/>
      </div>
    </>
  );
};

export default PushUpPage;
