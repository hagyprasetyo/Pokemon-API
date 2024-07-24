import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { PokemonDetail } from '../types/Pokemon';
import axios from 'axios';
import { usePokemonList } from '../hooks/usePokemon';

const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { pokemons, totalPages } = usePokemonList(currentPage);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonDetail[]>(pokemons);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location.search]);

  const handleSearch = async () => {
    if (search.trim() === '') {
      setFilteredPokemons(pokemons);
    } else {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
        setFilteredPokemons([response.data]);
        setError(null);
      } catch (error) {
        setError('Pokémon not found');
        setFilteredPokemons([]);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/?page=${newPage}`);
  };

  const handleSavePokemon = (pokemon: PokemonDetail) => {
    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons') || '[]');
    if (!savedPokemons.some((p: PokemonDetail) => p.name === pokemon.name)) {
      savedPokemons.push(pokemon);
      localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
    }
  };

  return (
    <div className="container h-full md:h-screen md:min-w-full p-5 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon"
          className="px-4 py-2 border rounded w-full md:w-1/3"
        />
        <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 dark:bg-blue-900 text-white rounded">
          Search
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.name} className="relative flex p-4 bg-gray-200 dark:bg-gray-800 dark:text-white rounded shadow flex-col justify-end items-center capitalize">
            <Link to={`/pokemon/${pokemon.name}`} className="flex flex-col items-center">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-2" />
              {pokemon.name}
            </Link>
            <button
              onClick={() => handleSavePokemon(pokemon)}
              className="absolute top-2 right-2 p-2 px-4 bg-green-500 text-white rounded-full"
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly items-center mt-4">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded"
        >
          Previous
        </button>
        <span className='dark:text-white'>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
