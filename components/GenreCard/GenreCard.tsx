"use client";

import Image from "next/image";
import Link from "next/link";
import { movieService } from "@/lib/services/movieService";
import type { GenreWithBackdrop } from "@/types/movie";

interface GenreCardProps {
  genre: GenreWithBackdrop;
}

export const GenreCard = ({ genre }: GenreCardProps) => {
  const imageUrl = genre.backdrop 
    ? movieService.getImageUrl(genre.backdrop)
    : null;

  return (
    <Link href={`/categories/${genre.id}`}>
      <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-48 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill
            alt={genre.name}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        )}
        
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold z-10 text-center px-4 drop-shadow-lg">
            {genre.name}
          </h2>
        </div>
        
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600 transition-all duration-300 rounded-2xl"></div>
      </div>
    </Link>
  );
};

