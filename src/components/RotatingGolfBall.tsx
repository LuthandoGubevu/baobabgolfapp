"use client";

import { useEffect, useRef } from "react";

export default function RotatingGolfBall() {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (ball) {
      ball.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(360deg)" }
        ],
        {
          duration: 4000,
          iterations: Infinity,
          easing: "linear"
        }
      );
    }
  }, []);

  const rows = 10;
  const cols = 10;

  return (
    <div className="flex justify-center items-center py-8">
      <div
        ref={ballRef}
        className="relative w-28 h-28 rounded-full bg-gradient-to-br from-white to-gray-200 shadow-[inset_8px_8px_15px_rgba(0,0,0,0.2)] overflow-hidden"
      >
        {/* Simulated dimples */}
        {Array.from({ length: rows }).flatMap((_, rowIdx) =>
          Array.from({ length: cols }).map((_, colIdx) => {
            const size = 3;
            const spacing = 28; // distance between dimples
            return (
              <span
                key={`${rowIdx}-${colIdx}`}
                className="absolute bg-gray-400 rounded-full opacity-70"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${rowIdx * spacing * 0.1 + 15}%`,
                  left: `${colIdx * spacing * 0.1 + 10}%`,
                  transform: "translate(-50%, -50%)"
                }}
              />
            );
          })
        )}
        {/* Shiny overlay to simulate light reflection */}
        <div className="absolute w-full h-full rounded-full bg-gradient-radial from-white/40 to-transparent" />
      </div>
    </div>
  );
}
