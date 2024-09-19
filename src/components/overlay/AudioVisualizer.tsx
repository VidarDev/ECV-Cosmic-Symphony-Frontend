import { useRef, useEffect } from 'react';
import * as Tone from 'tone';

interface SoundVisualizerProps {
  isPlaying: boolean;
  planetColor?: string;
}

export default function AudioVisualizer({
  isPlaying,
  planetColor = 'rgb(255, 255, 255)',
}: SoundVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<Tone.Analyser | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const previousPointsRef = useRef<number[]>([]);
  const maxFPS = 30;

  useEffect(() => {
    // CrÃ©er l'analyseur
    if (!analyserRef.current) {
      analyserRef.current = new Tone.Analyser('waveform', 1024);
      Tone.Destination.connect(analyserRef.current);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (timestamp: number) => {
      if (!analyserRef.current) return;

      if (timestamp - lastUpdateTimeRef.current >= 1000 / maxFPS) {
        const width = canvas.width;
        const height = canvas.height;
        const bufferLength = analyserRef.current.size;
        const dataArray = analyserRef.current.getValue() as Float32Array;

        ctx.fillStyle = 'rgb(15, 23, 42)';
        ctx.fillRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        const maxPeakHeight = 20;

        ctx.beginPath();

        const currentPoints: number[] = [];

        for (let i = 0; i < bufferLength; i++) {
          const angle = (i / bufferLength) * 2 * Math.PI;
          const normalizedAmplitude =
            Math.max(0, Math.min(dataArray[i], 1)) * 0.5;
          const smoothedAmplitude = previousPointsRef.current[i]
            ? previousPointsRef.current[i] * 0.7 + normalizedAmplitude * 0.3
            : normalizedAmplitude;
          const amplitude = smoothedAmplitude * maxPeakHeight;

          currentPoints.push(smoothedAmplitude);

          const x = centerX + Math.cos(angle) * (radius + amplitude);
          const y = centerY + Math.sin(angle) * (radius + amplitude);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevAngle = ((i - 1) / bufferLength) * 2 * Math.PI;
            const prevAmplitude = previousPointsRef.current[i - 1]
              ? previousPointsRef.current[i - 1] * maxPeakHeight
              : amplitude;
            const prevX =
              centerX + Math.cos(prevAngle) * (radius + prevAmplitude);
            const prevY =
              centerY + Math.sin(prevAngle) * (radius + prevAmplitude);

            const midX = (prevX + x) / 2;
            const midY = (prevY + y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, midX, midY);
          }
        }

        previousPointsRef.current = currentPoints;

        ctx.closePath();
        ctx.strokeStyle = planetColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        lastUpdateTimeRef.current = timestamp;
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(draw);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, planetColor]);

  return (
    <canvas ref={canvasRef} width="120" height="120" className="rounded-full" />
  );
}
