// hooks/usePoseDetection.ts
import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

const usePoseDetection = () => {
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      await tf.setBackend('webgl');

      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
      const detector = await poseDetection.createDetector(model, detectorConfig);
      setDetector(detector);
    };

    loadModel();
  }, []);

  const detectPose = async (video: HTMLVideoElement): Promise<poseDetection.Pose[]> => {
    if (detector) {
      const poses = await detector.estimatePoses(video);
      return poses;
    }
    return [];
  };

  return detectPose;
};

export default usePoseDetection;
