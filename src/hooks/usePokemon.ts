import { Pokemon, PokemonDetail } from '../types/Pokemon';
import { useEffect, useState } from 'react';

import axios from 'axios';

export const usePokemonList = (page: number) => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
        const pokemonDetails = await Promise.all(response.data.results.map((pokemon: Pokemon) => axios.get(pokemon.url)));
        setPokemons(pokemonDetails.map((res) => res.data));
        setTotalPages(Math.ceil(response.data.count / 20));
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };
    fetchPokemons();
  }, [page]);

  return { pokemons, totalPages };
};