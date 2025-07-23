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
          duration: 3000,
          iterations: Infinity,
          easing: "linear"
        }
      );
    }
  }, []);

  return (
    <div className="flex justify-center items-center py-8">
      <div
        ref={ballRef}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-inner"
        style={{ boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.2)" }}
      ></div>
    </div>
  );
}
