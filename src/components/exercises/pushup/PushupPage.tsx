'use client'
import React, { useCallback } from 'react';
import WebcamFeed from '@/components/webcam/webcam';

const PushUpPage = () => {
    const handleFrame = useCallback((video: HTMLVideoElement) => {
        // Do something with the video frame here
        console.log(video);
      }, [])
  return (
    <WebcamFeed onFrame={handleFrame}/>
  )
}

export default PushUpPage