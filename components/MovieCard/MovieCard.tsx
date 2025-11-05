"use client";

import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "@/hooks/useFavorites";
import { movieService } from "@/lib/services/movieService";
import type { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  showTitle?: boolean;
  className?: string;
}

export const MovieCard = ({ movie, showTitle = true, className = "" }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const imageUrl = movieService.getImageUrl(movie.poster_path);

  return (
    <div className={`relative group ${className}`}>
      <Link 
        href={`/movie/${movie.id}`}
        className="block"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={300}
            height={450}
            alt={movie.title}
            className="w-full rounded-xl cursor-pointer transition-transform duration-300 group-hover:scale-105 select-none"
            draggable={false}
          />
        ) : (
          <div className="w-full h-[450px] bg-gray-800 rounded-xl flex items-center justify-center select-none">
            <span className="text-gray-600 text-6xl">🎬</span>
          </div>
        )}
      </Link>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleFavorite(movie);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        className="absolute top-2 right-2 bg-black/70 p-2 rounded-full hover:bg-black/90 active:bg-black/95 transition-all duration-300 z-10 touch-manipulation"
        aria-label={isFavorite(movie.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {isFavorite(movie.id) ? (
          <AiFillHeart size={24} className="text-red-600" />
        ) : (
          <AiOutlineHeart size={24} className="text-white" />
        )}
      </button>

      {showTitle && (
        <p className="font-bold text-white text-base mt-3 truncate px-2 select-none">
          {movie.title}
        </p>
      )}
    </div>
  );
};

