import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { IncomingMessage } from 'node:http';

// Disable body parsing, since formidable will handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

// Define a type for the video file
interface VideoFile {
  filepath: string;
  originalFilename: string;
  mimetype: string;
  size: number;
}

export async function POST(req: NextRequest) {
  try {
    // Convert NextRequest to IncomingMessage
    const incomingMessage = req as unknown as IncomingMessage;
    const form = new formidable.IncomingForm();

    const formData = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(incomingMessage, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    // Ensure 'video' file is present and properly typed
    const videoFile = formData.files.video as formidable.File | formidable.File[] | undefined;

    if (!videoFile) {
      return NextResponse.json({ message: 'No video file uploaded' }, { status: 400 });
    }

    if (Array.isArray(videoFile)) {
      return NextResponse.json({ message: 'Multiple video files are not supported' }, { status: 400 });
    }

    // Type assertion to ensure videoFile is of type VideoFile
    const typedVideoFile = videoFile as VideoFile;

    // Log the received file details
    console.log('Files received:', formData.files);

    // Save the video to a temporary location
    const tempFilePath = path.join(process.cwd(), 'public', 'uploads', typedVideoFile.originalFilename || 'uploaded.webm');
    fs.renameSync(typedVideoFile.filepath || '', tempFilePath);

    // Send a response confirming receipt of the video
    return NextResponse.json({ message: 'Video received successfully' });
  } catch (error) {
    console.error('Error processing video upload:', error);
    return NextResponse.json({ message: 'Error processing video upload' }, { status: 500 });
  }
}
