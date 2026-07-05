"use client";

import CountUp from "react-countup";

interface AnimatedCounterProps {
  end: number;
}

export default function AnimatedCounter({
  end,
}: AnimatedCounterProps) {
  return (
    <CountUp
      start={0}
      end={end}
      duration={2}
      separator=","
    />
  );
}