"use client";

import { BiSolidCameraMovie } from "react-icons/bi";
import { AiFillGithub, AiFillHeart } from "react-icons/ai";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-10">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BiSolidCameraMovie size={32} className="text-red-600" />
              <h3 className="text-2xl font-black text-white">HFilms</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Seu destino definitivo para descobrir e acompanhar os melhores filmes.
              Explore, favorite e mergulhe no mundo do cinema.
            </p>
            <p className="text-gray-500 text-sm">
              Dados fornecidos por The Movie Database (TMDb)
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-red-600 transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-red-600 transition-colors">
                  Pesquisar
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-red-600 transition-colors">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/28" className="text-gray-400 hover:text-red-600 transition-colors">
                  Ação
                </Link>
              </li>
              <li>
                <Link href="/categories/35" className="text-gray-400 hover:text-red-600 transition-colors">
                  Comédia
                </Link>
              </li>
              <li>
                <Link href="/categories/18" className="text-gray-400 hover:text-red-600 transition-colors">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/categories/27" className="text-gray-400 hover:text-red-600 transition-colors">
                  Terror
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} HFilms. Desenvolvido por Hitalo Albuquerque
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <AiFillGithub size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

