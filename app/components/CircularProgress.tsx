"use client";

import { useEffect, useState } from "react";

interface Props {
  score: number;
}

export default function CircularProgress({ score }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(score);
    }, 300);

    return () => clearTimeout(timer);
  }, [score]);

  const radius = 60;
  const stroke = 10;

  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="flex justify-center items-center">
      <svg width={radius * 2} height={radius * 2}>
        {/* Background Circle */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="#374151"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Progress Circle */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="#3B82F6"
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />

        {/* Percentage */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="bold"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}