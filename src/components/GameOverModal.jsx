import { useState } from "react";
import Modal from "./Modal.jsx";
import "../styles/GameOverModal.css";

export default function GameOverModal({
  onPlayAgain,
  gameStatus,
  onContinue,
  winAudio,
  loseAudio,
}) {
  if (gameStatus === "win") {
    winAudio.play();
  } else {
    loseAudio.play();
  }
  return (
    <Modal>
      <div className="game-over-modal-content modal-content">
        <h2>{gameStatus === "win" ? "You Win!" : "Game Over!"}</h2>
        {gameStatus && (
          <img
            src={
              gameStatus === "win"
                ? "https://media2.giphy.com/media/xx0JzzsBXzcMK542tx/giphy.gif"
                : "https://media.tenor.com/TRTMIXMvMlAAAAAC/ditto-sad.gif"
            }
            className="status-gif"
            alt=""
          />
        )}

        <div className="options">
          {gameStatus === "win" && (
            <button onClick={onContinue}>Keep playing</button>
          )}
          <button onClick={onPlayAgain}>Play again</button>
        </div>
      </div>
    </Modal>
  );
}
