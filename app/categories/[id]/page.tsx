"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { LoadingSpinner } from "@/components/Loading/LoadingSpinner";
import { movieService } from "@/lib/services/movieService";
import { useFavorites } from "@/hooks/useFavorites";
import { getYear } from "@/lib/utils/text";
import type { Genre, Movie } from "@/types/movie";
import Link from "next/link";

const CategoriaDetalhesPage = () => {
  const params = useParams();
  const genreId = Number(params.id);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGenreAndMovies = async () => {
      try {
        setLoading(true);
        
        const [genres, moviesData] = await Promise.all([
          movieService.getGenres(),
          movieService.getMoviesByGenre(genreId, page),
        ]);

        const foundGenre = genres.find(g => g.id === genreId);
        setGenre(foundGenre || null);
        setMovies(moviesData.movies);
        setTotalPages(moviesData.totalPages);
      } catch (error) {
        console.error("Erro ao buscar filmes da categoria:", error);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchGenreAndMovies();
    }
  }, [genreId, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <LoadingSpinner message="Carregando filmes..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="mb-12">
          <Link
            href="/categories"
            className="text-red-600 hover:text-red-700 transition-colors mb-4 inline-block"
          >
            ← Voltar para Categorias
          </Link>
          <h1 className="text-white text-5xl font-bold mb-2">
            {genre?.name || "Categoria"}
          </h1>
          <p className="text-gray-400 text-lg">
            Página {page} de {totalPages > 500 ? 500 : totalPages}
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              Nenhum filme encontrado nesta categoria
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
              {movies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movie={movie} />
                  {movie.release_date && (
                    <p className="text-gray-400 text-sm mt-1 px-2">
                      {getYear(movie.release_date)}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  page === 1
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                ← Anterior
              </button>
              
              <span className="text-white font-semibold">
                Página {page}
              </span>

              <button
                onClick={handleNextPage}
                disabled={page >= totalPages || page >= 500}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  page >= totalPages || page >= 500
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                Próxima →
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoriaDetalhesPage;
