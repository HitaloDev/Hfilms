"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import type { Movie } from "@/types/movie";

interface MovieSliderProps {
  movies: Movie[];
  settings?: Settings;
  className?: string;
}

export const MovieSlider = ({ movies, settings, className = "" }: MovieSliderProps) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className={`px-4 md:px-0 -mx-4 md:mx-0 ${className}`}>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

