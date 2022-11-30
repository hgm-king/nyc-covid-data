import React, { useState, useEffect } from "react";

const intervalFrameRate = 200;

export default function Loader(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, intervalFrameRate);

    return () => clearInterval(interval);
  }, []);

  const trailingPeriods = Array.from({ length: count % 4 }, (_, i) => i)
    .map((x) => ".")
    .join("");

  return (
    <div className="text-left">
      <h3>Loading{trailingPeriods}</h3>
    </div>
  );
}
