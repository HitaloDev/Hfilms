"use client";

import { useFavorites } from "@/hooks/useFavorites";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";

const FavoritosPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 py-20">
        <h1 className="text-white text-4xl font-bold mb-10">
          Meus Favoritos
        </h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <AiFillHeart size={80} className="text-gray-700 mx-auto mb-5" />
            <p className="text-gray-400 text-xl">
              Você ainda não tem filmes favoritos.
            </p>
            <p className="text-gray-500 mt-2">
              Adicione filmes aos favoritos clicando no ícone de coração!
            </p>
            <Link href="/">
              <button className="mt-8 bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors">
                Explorar Filmes
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {favorites.map((film) => (
              <MovieCard key={film.id} movie={film} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritosPage;
