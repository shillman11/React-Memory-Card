import React from "react";
import "../styles/Scoreboard.css";

export default function Scoreboard({ score, numberOfCards, bestScore }) {
  return (
    <div className="scoreboard">
      <p className="best-score">
        High Score:{" "}
        <span>
          <b>{bestScore}</b>
        </span>
      </p>
      <div className="score">
        {score}/{numberOfCards}
      </div>
    </div>
  );
}
