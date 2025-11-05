"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "@/hooks/useFavorites";
import { useMovies } from "@/hooks/useMovies";
import { movieService } from "@/lib/services/movieService";
import { getFirstSentence } from "@/lib/utils/text";

export const HeroCarousel = () => {
  const { movies, loading } = useMovies();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading || movies.length === 0) {
    return null;
  }

  return (
    <div className="relative h-screen">
      <Carousel className="absolute top-0 h-screen" autoPlay>
        <CarouselContent>
          {movies.map((film) => (
            <CarouselItem key={film.id} className="relative">
              <Image
                src={movieService.getImageUrl(film.backdrop_path)}
                width={3000}
                height={3000}
                alt={film.title}
                className="w-full h-screen object-cover opacity-40 max-lg:mb-0"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
              <div className="flex max-lg:flex-col-reverse max-lg:justify-center items-center justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[1200px] mx-auto">
                <div className="mr-10 max-lg:mr-0 text-white">
                  <h1 className="text-white text-5xl max-lg:text-2xl max-lg:px-5 font-bold mb-7 max-lg:text-center mx-auto">
                    {film.title}
                  </h1>
                  <p className="font-light mb-7 max-lg:text-center max-lg:mx-7 max-w-[500px]">
                    {getFirstSentence(film.overview)}
                  </p>
                  <div className="flex gap-6 max-lg:justify-center">
                    <Link href={`/movie/${film.id}`}>
                      <button className="text-lg max-lg:text-sm font-semibold bg-red-600 max-lg:w-32 w-44 rounded-full py-2 hover:bg-red-700 transition-colors">
                        Ver detalhes
                      </button>
                    </Link>
                    <button
                      onClick={() => toggleFavorite(film)}
                      className="text-lg max-lg:text-sm font-semibold border-2 max-lg:w-32 border-white w-44 rounded-full py-2 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                      {isFavorite(film.id) ? (
                        <>
                          <AiFillHeart size={20} />
                          Favoritado
                        </>
                      ) : (
                        <>
                          <AiOutlineHeart size={20} />
                          Favoritar
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="w-80 h-auto max-w-full max-h-[500px] flex justify-center items-center">
                  <Image
                    src={movieService.getImageUrl(film.poster_path)}
                    width={3000}
                    height={3000}
                    alt={film.title}
                    className="rounded-3xl max-lg:mb-5 max-lg:w-48"
                    priority
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

