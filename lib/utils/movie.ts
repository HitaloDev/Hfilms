import type { Movie } from '@/types/movie';

export const getRandomMovie = (movies: Movie[]): Movie | null => {
  if (!movies || movies.length === 0) return null;
  return movies[Math.floor(Math.random() * movies.length)];
};

export const getMovieWithBackdrop = (movies: Movie[]): Movie | null => {
  if (!movies || movies.length === 0) return null;
  return movies.find(movie => movie.backdrop_path) || null;
};

