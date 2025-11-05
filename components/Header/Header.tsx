"use client";

import { BiSearch, BiCategory, BiMenu, BiX } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-center relative z-50">
        <div className="flex justify-between items-center py-5 w-full max-w-[1200px] px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-full.png"
              alt="HFilms Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
          
          <nav className="hidden lg:flex gap-6 text-white items-center">
            <Link 
              href="/" 
              className={`text-lg hover:text-red-600 transition-colors ${pathname === '/' ? 'text-red-600 font-bold' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className={`text-lg hover:text-red-600 transition-colors flex items-center gap-2 ${isActive('/categories') ? 'text-red-600 font-bold' : ''}`}
            >
              <BiCategory size={20} />
              Categorias
            </Link>
            <Link 
              href="/search" 
              className={`text-lg hover:text-red-600 transition-colors flex items-center gap-2 ${isActive('/search') ? 'text-red-600 font-bold' : ''}`}
            >
              <BiSearch size={20} />
              Pesquisar
            </Link>
            <Link 
              href="/favorites" 
              className={`text-lg hover:text-red-600 transition-colors flex items-center gap-2 ${isActive('/favorites') ? 'text-red-600 font-bold' : ''}`}
            >
              <AiFillHeart size={20} />
              Favoritos
            </Link>
          </nav>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-white z-50"
          >
            {menuOpen ? <BiX size={32} /> : <BiMenu size={32} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-black/95 z-40 lg:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-8 text-white">
            <Link 
              href="/" 
              onClick={closeMenu}
              className={`text-2xl hover:text-red-600 transition-colors ${pathname === '/' ? 'text-red-600 font-bold' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              onClick={closeMenu}
              className={`text-2xl hover:text-red-600 transition-colors flex items-center gap-2 ${isActive('/categories') ? 'text-red-600 font-bold' : ''}`}
            >
              <BiCategory size={24} />
              Categorias
            </Link>
            <Link 
              href="/search" 
              onClick={closeMenu}
              className={`text-2xl hover:text-red-600 transition-colors flex items-center gap-2 ${isActive('/search') ? 'text-red-600 font-bold' : ''}`}
            >
              <BiSearch size={24} />
              Pesquisar
            </Link>
            <Link 
              href="/favorites" 
              onClick={closeMenu}
              className={`text-2xl hover:text-red-600 transition-colors flex items-center gap-2 ${isActive('/favorites') ? 'text-red-600 font-bold' : ''}`}
            >
              <AiFillHeart size={24} />
              Favoritos
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

export default Header