import { FaMoon, FaSun } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="p-4 shadow bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold dark:text-white">Pokémon</Link>
        <div className="flex items-center">
          <Link to="/pokedex" className="mr-4 text-2xl font-bold dark:text-white">Pokédex</Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded flex items-center justify-center"
          >
            {darkMode ? <FaMoon className="text-yellow-500" /> : <FaSun className="text-yellow-500" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;