import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  return (
    <main className="hero-section flex justify-center w-full py-8">
      <div className="hero-container bg-gradient-to-br from-[#3B1C32] to-[#1A1A1D] rounded-3xl flex items-center justify-between p-20 max-w-screen-2xl w-10/12 shadow-2xl m-10">
        <div className="hero-content max-w-lg">
          <div className="tabs flex gap-10 mb-8 text-gray-300">
            <span className="cursor-pointer hover:text-white">COMICS</span>
            <span className="cursor-pointer hover:text-white">NOVELS</span>
            <span className="cursor-pointer hover:text-white">MANGA</span>
          </div>
          <h1 className="text-5xl text-white leading-snug mb-6">
            Kenzo Manga, <br /> Unlocking Endless Realms!
          </h1>
          <p className="mb-6 text-gray-400 text-xl leading-relaxed">
            Kenzo Manga is your ultimate hub for manga, manhwa, novels, comics, and webtoons. Dive into captivating stories, explore trending titles, and connect with a vibrant community of readers worldwide!
          </p>
          <Link to="/discover" className="browse-button bg-purple-600 text-white text-lg py-4 px-10 rounded-full hover:bg-white hover:text-black transition duration-300">
            Dive In
          </Link>
        </div>
        <div className="hero-image">
          <img className="w-96 rounded-lg shadow-xl" src="https://i.pinimg.com/control2/736x/ba/81/3c/ba813cf23f534eeca0bfc75ebd3088a7.jpg" alt="God Game Cover" />
        </div>
      </div>
    </main>


  );
};

export default HeroBanner;