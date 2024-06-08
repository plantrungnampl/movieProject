import React, { useEffect, useState } from "react";

const ProgressBar = ({
  duration,
  onComplete,
}: {
  duration: number;
  onComplete: () => void;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%`, transition: "width 0.1s" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
