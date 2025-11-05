import { useState, useEffect } from 'react';
import { movieService } from '@/lib/services/movieService';
import type { Movie } from '@/types/movie';

interface UseMovieSearchOptions {
  debounceMs?: number;
}

export const useMovieSearch = (options: UseMovieSearchOptions = {}) => {
  const { debounceMs = 500 } = options;
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        setLoading(true);
        setHasSearched(true);
        setError(null);
        
        const data = await movieService.searchMovies(searchTerm);
        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao buscar filmes'));
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, debounceMs]);

  return {
    searchTerm,
    setSearchTerm,
    movies,
    loading,
    hasSearched,
    error,
  };
};

