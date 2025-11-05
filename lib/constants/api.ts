export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://api.themoviedb.org/3/movie/',
  SEARCH_URL: process.env.NEXT_PUBLIC_SEARCH || 'https://api.themoviedb.org/3/search/movie?query',
  IMAGE_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL_IMAGE || 'https://image.tmdb.org/t/p/original',
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || '',
  DEFAULT_LANGUAGE: 'pt-BR',
  DEFAULT_PAGE: 1,
} as const;

export const API_ENDPOINTS = {
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  UPCOMING: 'upcoming',
  NOW_PLAYING: 'now_playing',
  GENRE_LIST: 'https://api.themoviedb.org/3/genre/movie/list',
  DISCOVER: 'https://api.themoviedb.org/3/discover/movie',
} as const;

