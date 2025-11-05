import { useState, useEffect } from 'react';
import { movieService } from '@/lib/services/movieService';
import type { Movie } from '@/types/movie';

interface UseMoviesOptions {
  endpoint?: string;
  page?: number;
  enabled?: boolean;
}

export const useMovies = (options: UseMoviesOptions = {}) => {
  const { endpoint, page = 1, enabled = true } = options;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data: Movie[];
        if (endpoint) {
          data = await movieService.getMoviesByCategory(endpoint, page);
        } else {
          data = await movieService.getPopularMovies(page);
        }
        
        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, page, enabled]);

  return { movies, loading, error };
};

