"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function InterviewTimer() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error("Interview time is over!");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg text-center font-bold text-xl">
      Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}