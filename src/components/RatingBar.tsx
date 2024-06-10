import React from "react";

export default function RatingBar({ rating }: { rating: number }) {
  return (
    <div className="rating-bar">
      <div className="rating-bar-bg">
        <div
          className="rating-bar-fill"
          style={{
            width: `${rating}%`,
            height: "20px",
            backgroundColor: "red",
            borderRadius: "10px",
          }}
        ></div>
      </div>
      <span className="rating-bar-text">{rating}%</span>
      <style jsx>{`
        .rating-bar {
          display: flex;
          align-items: center;
        }
        .rating-bar-bg {
          width: 100%;
          height: 20px;
          background-color:red
          border-radius: 10px;
          background-color: grey;
          overflow: hidden;
        }
        .rating-bar-fill {
          width: 0;
          height: 100%;
          background-color: red;
          border-radius: 10px;
        }
        .rating-bar-text {
          font-size: 12px;
          color: grey;
        }
      `}</style>
    </div>
  );
}
