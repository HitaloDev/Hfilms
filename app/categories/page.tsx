"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { GenreCard } from "@/components/GenreCard/GenreCard";
import { LoadingSpinner } from "@/components/Loading/LoadingSpinner";
import { useGenres } from "@/hooks/useGenres";
import { movieService } from "@/lib/services/movieService";
import { getRandomMovie } from "@/lib/utils/movie";

const CategoriasPage = () => {
  const { genres, loading } = useGenres();
  const [backgroundMovie, setBackgroundMovie] = useState<string | null>(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const fetchRandomBackground = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 5) + 1;
        const movies = await movieService.getPopularMovies(randomPage);
        const randomMovie = getRandomMovie(movies);
        if (randomMovie?.backdrop_path) {
          setBackgroundMovie(randomMovie.backdrop_path);
        }
      } catch (error) {
        console.error("Erro ao buscar filme para fundo:", error);
      }
    };

    if (!loading) {
      fetchRandomBackground();
    }
  }, [loading]);

  if (loading || (backgroundMovie && !backgroundLoaded)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner 
          message="Carregando Categorias"
          size="lg"
        />
        
        {backgroundMovie && (
          <div className="hidden">
            <Image
              src={movieService.getImageUrl(backgroundMovie)}
              width={1920}
              height={1080}
              alt="Preload"
              priority
              onLoad={() => setBackgroundLoaded(true)}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {backgroundMovie && (
        <>
          <div className="fixed inset-0 z-0">
            <Image
              src={movieService.getImageUrl(backgroundMovie)}
              fill
              alt="Background"
              className="object-cover"
              priority
            />
          </div>
          <div className="fixed inset-0 bg-black/85 z-0"></div>
        </>
      )}
      
      <div className="relative z-10">
        <Header />
        
        <div className="max-w-[1200px] mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-white text-5xl font-bold mb-4">
              Explorar por Categoria
            </h1>
            <p className="text-gray-400 text-lg">
              Descubra filmes por gênero
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.map((genre) => (
              <GenreCard key={genre.id} genre={genre} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CategoriasPage;
