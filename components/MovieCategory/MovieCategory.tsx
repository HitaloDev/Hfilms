"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMovies } from "@/hooks/useMovies";
import { movieService } from "@/lib/services/movieService";
import { getMovieWithBackdrop } from "@/lib/utils/movie";
import { SectionBackground } from "@/components/SectionBackground/SectionBackground";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { LoadingSpinner } from "@/components/Loading/LoadingSpinner";
import type { Settings } from "react-slick";

interface MovieCategoryProps {
  title: string;
  endpoint: string;
}

export const MovieCategory = ({ title, endpoint }: MovieCategoryProps) => {
  const { movies, loading } = useMovies({ endpoint });
  const [backgroundBackdrop, setBackgroundBackdrop] = useState<string | null>(null);

  useEffect(() => {
    if (movies.length > 0) {
      const movieWithBackdrop = getMovieWithBackdrop(movies);
      setBackgroundBackdrop(movieWithBackdrop?.backdrop_path || null);
    }
  }, [movies]);

  const displayMovies = movies.slice(0, 12);

  const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 10,
    useCSS: true,
    useTransform: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          touchThreshold: 10,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          touchThreshold: 10,
          arrows: false,
        },
      },
    ],
  };

  return (
    <SectionBackground backdropPath={backgroundBackdrop} className="w-full mb-4">
      <div className="max-w-[1200px] mx-auto px-8 md:px-4 py-12">
        <h2 className="text-white text-3xl font-bold mb-8">{title}</h2>
        
        {loading ? (
          <LoadingSpinner message={`Carregando ${title}...`} size="sm" />
        ) : (
          <div className="px-4 md:px-0 -mx-4 md:mx-0">
            <Slider {...sliderSettings}>
              {displayMovies.map((movie) => (
                <div key={movie.id} className="px-2">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </SectionBackground>
  );
};

export default MovieCategory;
