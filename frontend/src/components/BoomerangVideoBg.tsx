import React, { useRef, useEffect, useState } from 'react';

export function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [framesReady, setFramesReady] = useState(false);
  const framesRef = useRef<HTMLCanvasElement[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isCapturing = true;
    let lastTime = -1;

    const captureFrame = () => {
      if (!isCapturing || !video) return;
      
      if (video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        
        const frameCanvas = document.createElement('canvas');
        const aspect = video.videoHeight / video.videoWidth;
        const targetWidth = Math.min(960, video.videoWidth || 960);
        const targetHeight = targetWidth * aspect;
        
        frameCanvas.width = targetWidth;
        frameCanvas.height = targetHeight;
        
        const ctx = frameCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
          framesRef.current.push(frameCanvas);
        }
      }
      
      const vid = video as any;
      if (vid.requestVideoFrameCallback) {
        vid.requestVideoFrameCallback(captureFrame);
      } else {
        requestAnimationFrame(captureFrame);
      }
    };

    const onPlay = () => {
      const vid = video as any;
      if (vid.requestVideoFrameCallback) {
        vid.requestVideoFrameCallback(captureFrame);
      } else {
        requestAnimationFrame(captureFrame);
      }
    };

    const onEnded = () => {
      isCapturing = false;
      setFramesReady(true);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('ended', onEnded);

    video.play().catch(e => console.error("Video play failed", e));

    return () => {
      isCapturing = false;
      video.removeEventListener('play', onPlay);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  // Playback logic
  useEffect(() => {
    if (!framesReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames = framesRef.current;
    if (frames.length === 0) return;

    // ensure display canvas is sized right
    canvas.width = frames[0].width;
    canvas.height = frames[0].height;

    let frameIndex = 0;
    let forward = true;
    let intervalId: any;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);

      if (forward) {
        frameIndex++;
        if (frameIndex >= frames.length - 1) {
          forward = false;
          frameIndex = frames.length - 1;
        }
      } else {
        frameIndex--;
        if (frameIndex <= 0) {
          forward = true;
          frameIndex = 0;
        }
      }
    };

    intervalId = setInterval(draw, 1000 / 30);

    return () => clearInterval(intervalId);
  }, [framesReady]);

  return (
    <div className="absolute inset-0 z-0 scale-[1.15] origin-top overflow-hidden">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="w-full h-full object-cover object-top"
        style={{ display: framesReady ? 'none' : 'block' }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover object-top"
        style={{ display: framesReady ? 'block' : 'none' }}
      />
    </div>
  );
}
