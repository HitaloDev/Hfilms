import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS } from '@/lib/constants/api';
import type { Movie, MovieDetails, Genre, Cast, ApiResponse } from '@/types/movie';

class MovieService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly imageBaseUrl: string;
  private readonly language: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.API_KEY;
    this.imageBaseUrl = API_CONFIG.IMAGE_BASE_URL;
    this.language = API_CONFIG.DEFAULT_LANGUAGE;
  }

  private buildUrl(endpoint: string, params: Record<string, string | number> = {}): string {
    const base = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
    const url = new URL(base);
    url.searchParams.append('language', this.language);
    url.searchParams.append('api_key', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    return url.toString();
  }

  async getPopularMovies(page: number = 1): Promise<Movie[]> {
    try {
      const url = this.buildUrl(API_ENDPOINTS.POPULAR, { page });
      const response = await axios.get<ApiResponse<Movie>>(url);
      return response.data.results;
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      throw error;
    }
  }

  async getMoviesByCategory(endpoint: string, page: number = 1): Promise<Movie[]> {
    try {
      const url = this.buildUrl(endpoint, { page });
      const response = await axios.get<ApiResponse<Movie>>(url);
      return response.data.results;
    } catch (error) {
      console.error(`Erro ao buscar filmes da categoria ${endpoint}:`, error);
      throw error;
    }
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=${this.language}&api_key=${this.apiKey}`;
      const response = await axios.get<MovieDetails>(url);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar detalhes do filme ${movieId}:`, error);
      throw error;
    }
  }

  async getMovieCast(movieId: number): Promise<Cast[]> {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=${this.language}&api_key=${this.apiKey}`;
      const response = await axios.get<{ cast: Cast[] }>(url);
      return response.data.cast.slice(0, 10);
    } catch (error) {
      console.error(`Erro ao buscar elenco do filme ${movieId}:`, error);
      throw error;
    }
  }

  async getSimilarMovies(movieId: number): Promise<Movie[]> {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=${this.language}&api_key=${this.apiKey}`;
      const response = await axios.get<ApiResponse<Movie>>(url);
      return response.data.results.slice(0, 6);
    } catch (error) {
      console.error(`Erro ao buscar filmes similares do filme ${movieId}:`, error);
      throw error;
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<Movie[]> {
    try {
      const url = `${API_CONFIG.SEARCH_URL}=${encodeURIComponent(query)}&include_adult=false&language=${this.language}&page=${page}&api_key=${this.apiKey}`;
      const response = await axios.get<ApiResponse<Movie>>(url);
      return response.data.results;
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      throw error;
    }
  }

  async getGenres(): Promise<Genre[]> {
    try {
      const url = `${API_ENDPOINTS.GENRE_LIST}?language=${this.language}&api_key=${this.apiKey}`;
      const response = await axios.get<{ genres: Genre[] }>(url);
      return response.data.genres;
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      throw error;
    }
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<{ movies: Movie[]; totalPages: number }> {
    try {
      const url = `${API_ENDPOINTS.DISCOVER}?with_genres=${genreId}&language=${this.language}&api_key=${this.apiKey}&page=${page}&sort_by=popularity.desc`;
      const response = await axios.get<ApiResponse<Movie>>(url);
      return {
        movies: response.data.results,
        totalPages: response.data.total_pages > 500 ? 500 : response.data.total_pages,
      };
    } catch (error) {
      console.error(`Erro ao buscar filmes do gênero ${genreId}:`, error);
      throw error;
    }
  }

  async getRandomBackdropMovie(movies: Movie[]): Promise<string | null> {
    if (!movies || movies.length === 0) return null;
    
    const movieWithBackdrop = movies.find(movie => movie.backdrop_path);
    return movieWithBackdrop?.backdrop_path || null;
  }

  getImageUrl(path: string | null | undefined, size: 'original' | 'w500' = 'original'): string {
    if (!path) return '';
    return `${this.imageBaseUrl.replace('/original', `/${size}`)}${path}`;
  }
}

export const movieService = new MovieService();

