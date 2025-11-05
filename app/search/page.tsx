"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { LoadingSpinner } from "@/components/Loading/LoadingSpinner";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { BiSearch } from "react-icons/bi";
import { getYear } from "@/lib/utils/text";

const PesquisarPage = () => {
  const { searchTerm, setSearchTerm, movies, loading, hasSearched } = useMovieSearch();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-white text-5xl font-bold mb-6">
            Pesquisar Filmes
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Encontre seus filmes favoritos
          </p>

          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do filme..."
              className="w-full px-6 py-4 pl-14 bg-gray-900 text-white rounded-full border-2 border-gray-700 focus:border-red-600 focus:outline-none transition-all text-lg"
            />
            <BiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>

        {loading && (
          <LoadingSpinner message="Buscando filmes..." />
        )}

        {!loading && hasSearched && (
          <>
            {movies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">
                  Nenhum filme encontrado para "{searchTerm}"
                </p>
                <p className="text-gray-500 mt-2">
                  Tente pesquisar com outras palavras-chave
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-white text-2xl font-semibold">
                    {movies.length} resultado{movies.length !== 1 ? 's' : ''} encontrado{movies.length !== 1 ? 's' : ''} para "{searchTerm}"
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
              </>
            )}
          </>
        )}

        {!hasSearched && !loading && (
          <div className="text-center py-20">
            <BiSearch size={80} className="text-gray-700 mx-auto mb-5" />
            <p className="text-gray-400 text-xl">
              Digite algo na barra de pesquisa para começar
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PesquisarPage;
