"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { HeroCarousel } from "@/components/HeroCarousel/HeroCarousel";
import ListFilms from "@/components/ListFilms/ListFilms";
import MovieCategory from "@/components/MovieCategory/MovieCategory";

const Home = () => {
  return (
    <div>
      <div className="relative h-screen">
        <Header />
        <HeroCarousel />
      </div>
      
      <div className="mt-4">
        <ListFilms />
        <MovieCategory title="Em Breve nos Cinemas" endpoint="upcoming" />
        <MovieCategory title="Melhores Avaliados" endpoint="top_rated" />
        <MovieCategory title="Filmes em Cartaz" endpoint="now_playing" />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
