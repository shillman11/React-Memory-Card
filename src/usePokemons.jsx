import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export default function usePokemons() {
  const [pokemons, setPokemons] = useState([]);

  const getPokemon = async (id) => {
    const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, sprites } = await pokemonInfo.json();
    const image = sprites.front_default;

    return { name, image };
  };

  const getRandomPokemons = async (amount) => {
    const newPokemons = [];
    const randomIDs = [];
    for (let i = 0; i < amount; i++) {
      let randomID = Math.floor(Math.random() * (152 - 1) + 1);
      while (randomIDs.includes(randomID)) {
        randomID = Math.floor(Math.random() * (152 - 1) + 1);
      }
      const pokemon = await getPokemon(randomID);
      newPokemons.push(pokemon);
      randomIDs.push(randomID);
    }
    setPokemons(newPokemons);
  };

  function shufflePokemons(pokemons) {
    const availableCards = [...pokemons];
    const newRandomCardArray = [];
    while (availableCards.length) {
      const index = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[index];
      card.id = uuid();
      newRandomCardArray.push(card);
      availableCards.splice(index, 1);
    }
    setPokemons(newRandomCardArray);
  }

  return {
    pokemons,
    getRandomPokemons,
    shufflePokemons,
    setPokemons,
    getPokemon,
  };
}
