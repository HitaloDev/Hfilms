import { useState, useEffect } from 'react';
import { movieService } from '@/lib/services/movieService';
import type { GenreWithBackdrop } from '@/types/movie';

export const useGenres = () => {
  const [genres, setGenres] = useState<GenreWithBackdrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGenresWithBackdrops = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const genresList = await movieService.getGenres();
        
        const genresWithBackdrops = await Promise.all(
          genresList.map(async (genre) => {
            try {
              const { movies } = await movieService.getMoviesByGenre(genre.id, 1);
              const movieWithBackdrop = movies.find(m => m.backdrop_path);
              
              return {
                ...genre,
                backdrop: movieWithBackdrop?.backdrop_path || null,
              };
            } catch (error) {
              console.error(`Erro ao buscar filmes do gênero ${genre.name}:`, error);
              return { ...genre, backdrop: null };
            }
          })
        );
        
        setGenres(genresWithBackdrops);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao buscar gêneros'));
      } finally {
        setLoading(false);
      }
    };

    fetchGenresWithBackdrops();
  }, []);

  return { genres, loading, error };
};

