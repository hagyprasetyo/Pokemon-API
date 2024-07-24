import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { PokemonDetail } from '../types/Pokemon';

const PokedexPage: React.FC = () => {
  const [savedPokemons, setSavedPokemons] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const pokemons = JSON.parse(localStorage.getItem('savedPokemons') || '[]');
    setSavedPokemons(pokemons);
  }, []);

  const handleRemovePokemon = (name: string) => {
    const updatedPokemons = savedPokemons.filter(pokemon => pokemon.name !== name);
    setSavedPokemons(updatedPokemons);
    localStorage.setItem('savedPokemons', JSON.stringify(updatedPokemons));
  };

  return (
    <div className="container h-full md:h-screen md:min-w-full p-5 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 dark:text-white flex justify-center">My Pokedex</h2>
      {savedPokemons.length === 0 ? (
        <div className="dark:text-white flex justify-center">No Pokémon saved.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {savedPokemons.map((pokemon) => (
            <div key={pokemon.name} className="relative flex p-4 bg-gray-200 dark:bg-gray-800 dark:text-white rounded shadow flex-col justify-end items-center capitalize">
              <Link to={`/pokemon/${pokemon.name}`} className="flex flex-col items-center">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-2" />
                {pokemon.name}
              </Link>
              <button
                onClick={() => handleRemovePokemon(pokemon.name)}
                className="absolute top-2 right-2 p-2 px-4 bg-red-500 text-white rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Link to="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PokedexPage;
