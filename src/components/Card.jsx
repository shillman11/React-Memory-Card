import React from "react";
import "../styles/Card.css";

export default function Card({ pokemon, handleCardClick }) {
  return (
    <button
      className="card-button"
      onClick={() => handleCardClick(pokemon.name)}
    >
      <div className="card-image-container">
        <img src={pokemon.image} alt="" className="card-image" />
      </div>
      <div className="card-name-container">
        <div className="card-name">{pokemon.name}</div>
      </div>
    </button>
  );
}
