import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RatingCircleProps {
  rating: number; // Rating as a percentage (0-100)
}

const getColor = (rating: number) => {
  if (rating >= 70) {
    return "#4caf50"; // Green
  } else if (rating >= 40) {
    return "#ffeb3b"; // Yellow
  } else {
    return "#f44336"; // Red
  }
};

const RatingBar: React.FC<RatingCircleProps> = ({ rating }) => {
  return (
    <div className="rating-circle w-10 h-10">
      <CircularProgressbar
        value={rating}
        text={`${rating}%`}
        styles={buildStyles({
          textSize: "30px",
          textColor: "#fff",
          pathColor: getColor(rating),
          trailColor: "#e0e0e0",
        })}
      />
    </div>
  );
};

export default RatingBar;
