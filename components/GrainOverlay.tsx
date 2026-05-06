"use client";
import { useEffect, useRef } from "react";

export default function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    c.width = 300; c.height = 300;
    let id: number;
    const draw = () => {
      id = requestAnimationFrame(draw);
      if (Math.random() > 0.35) return; // throttle
      const img = ctx.createImageData(300, 300);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        zIndex: 1, pointerEvents: "none", opacity: 0.045, mixBlendMode: "screen",
      }}
    />
  );
}