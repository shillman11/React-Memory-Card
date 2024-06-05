import { useEffect, useState } from "react";
import "./App.css";
import usePokemons from "./usePokemons.jsx";
import Card from "./components/Card.jsx";
import Game from "./components/Game.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import { v4 as uuid } from "uuid";
import GameOverModal from "./components/GameOverModal.jsx";
import Modal from "./components/Modal.jsx";
import CLICKSOUND from "./assets/pokemon-a-button.mp3";
import WINSOUND from "./assets/victory.mp3";
import LOSESOUND from "./assets/lose.mp3";
import LEVELUPSOUND from "./assets/levelup.mp3";

function App() {
  const {
    pokemons,
    shufflePokemons,
    setPokemons,
    getRandomPokemons,
    getPokemon,
  } = usePokemons();

  const [chosenPokemons, setChosenPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("best-score") || 0
  );
  const [gameStatus, setGameStatus] = useState("playing");
  const [numberOfCards, setNumberOfCards] = useState(5);

  const clickAudio = new Audio(CLICKSOUND);
  clickAudio.volume = 0.3;
  const winAudio = new Audio(WINSOUND);
  winAudio.volume = 0.5;
  const loseAudio = new Audio(LOSESOUND);
  const continueAudio = new Audio(LEVELUPSOUND);
  continueAudio.volume = 0.5;

  useEffect(() => {
    getRandomPokemons(numberOfCards);
  }, []);

  const handleCardClick = (pokemonName) => {
    const newChosenPokemons = [...chosenPokemons];
    clickAudio.play();
    if (chosenPokemons.includes(pokemonName)) {
      console.log("already chosen");
      const newBestScore = Math.max(score, bestScore);
      setBestScore(newBestScore);
      localStorage.setItem("best-score", newBestScore);
      setGameStatus("lose");
    } else {
      if (gameStatus === "playing") {
        newChosenPokemons.push(pokemonName);
        const newScore = score;
        shufflePokemons(pokemons);
        setScore(newScore + 1);
        if (newScore + 1 === numberOfCards) {
          setGameStatus("win");
        }
        return setChosenPokemons(newChosenPokemons);
      }
    }
  };

  const onPlayAgain = () => {
    clickAudio.play();
    setScore(0);
    setChosenPokemons([]);
    setGameStatus("playing");
    setNumberOfCards(5);
    getRandomPokemons(5);
  };

  const onContinue = () => {
    winAudio.pause();
    continueAudio.play();
    setChosenPokemons([]);
    setGameStatus("playing");
    const nextLevel = numberOfCards * 2;
    setNumberOfCards(numberOfCards + nextLevel);
    getRandomPokemons(nextLevel);
  };

  // console.log(pokemons, "pokemons");
  // console.log(chosenPokemons, "chosenPokemons");

  return (
    <>
      <div className="app">
        <div className="scoreboard-container">
          <Scoreboard
            score={score}
            numberOfCards={numberOfCards}
            bestScore={bestScore}
          ></Scoreboard>
        </div>
        <div className="cards-container">
          {pokemons.map((pokemon, index) => {
            return (
              <Card
                key={index}
                pokemon={pokemon}
                handleCardClick={handleCardClick}
              ></Card>
            );
          })}
        </div>
      </div>
      {(gameStatus === "win" || gameStatus === "lose") && (
        <GameOverModal
          score={score}
          onPlayAgain={onPlayAgain}
          gameStatus={gameStatus}
          onContinue={onContinue}
          winAudio={winAudio}
          loseAudio={loseAudio}
        ></GameOverModal>
      )}
    </>
  );
}

export default App;
