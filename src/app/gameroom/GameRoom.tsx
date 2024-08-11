"use client";

import { useEffect } from "react";

export default function GameRoom() {
  useEffect(() => {
    const videoElement = document.querySelector("video");

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      })
      .catch(error => {
        console.error("Error accessing webcam:", error);
      });

    return () => {
      // Clean up video stream if necessary
      const tracks = (videoElement?.srcObject as MediaStream)?.getTracks();
      tracks?.forEach(track => track.stop());
    };
  }, []);

  return (
    <div>
      <h1>Game Room</h1>
      <video autoPlay playsInline />
    </div>
  );
}
