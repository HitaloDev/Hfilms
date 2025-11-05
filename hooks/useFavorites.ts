"use client";

import { Movie } from '@/types/movie';
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('hfilms-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem('hfilms-favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (movieId: number) => {
    const newFavorites = favorites.filter(fav => fav.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem('hfilms-favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(fav => fav.id === movieId);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};

