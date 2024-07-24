import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import PokedexPage from './pages/PokedexPage';
import PokemonDetailPage from './pages/PokemonDetailPage';

const App: React.FC = () => {
    const [isDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        <Route path="/pokedex" element={<PokedexPage />} />
      </Routes>
    </Router>
  );
};

export default App;
