import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

const PokemonDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemon();
  }, [name]);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };

  if (!pokemon) return <div>Loading...</div>;

  const animatedSprite = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;

  const data = {
    labels: pokemon.stats.map((stat) => stat.stat.name),
    datasets: [
      {
        label: 'Stats',
        data: pokemon.stats.map((stat) => stat.base_stat),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: `${pokemon.name} Stats`,
      },
      datalabels: {
        anchor: 'end' as const,
        align: 'end' as const,
        offset: -30,
        formatter: (value: number) => value.toString(),
        color: (context: any) => context.chart.canvas.parentNode?.parentNode?.parentNode?.classList.contains('dark') ? 'white' : 'black',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: (context: any) => context.chart.canvas.parentNode?.parentNode?.parentNode?.classList.contains('dark') ? 'white' : 'black',
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: (context: any) => context.chart.canvas.parentNode?.parentNode?.parentNode?.classList.contains('dark') ? 'white' : 'black',
        }
      },
    },
  };

  return (
    <div className="container h-full md:h-screen md:min-w-full p-5 dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <img
          src={animatedSprite || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mb-4 w-24 min-h-24"
        />
        <h2 className="text-2xl font-bold capitalize mb-4 dark:text-white">
          {pokemon.name}
        </h2>
        <div className="w-full max-w-md dark:text-white">
          <Bar data={data} options={options} />
        </div>
        <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 dark:bg-gray-800 text-white rounded">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
