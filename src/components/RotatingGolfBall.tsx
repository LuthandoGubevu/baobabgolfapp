"use client";

import { useState, useEffect, useRef } from "react";

type Dimple = {
  top: string;
  left: string;
};

export default function RotatingGolfBall() {
  const ballRef = useRef<HTMLDivElement>(null);
  const [dimples, setDimples] = useState<Dimple[]>([]);

  useEffect(() => {
    // Generate dimples only on the client-side to avoid hydration mismatch
    const generatedDimples = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setDimples(generatedDimples);

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
        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-inner overflow-hidden"
        style={{ boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.2)" }}
      >
        {dimples.map((style, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-60"
            style={{
              ...style,
              transform: "translate(-50%, -50%)"
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
