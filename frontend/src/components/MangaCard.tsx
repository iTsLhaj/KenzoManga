import React from "react";
import { Link } from "react-router-dom";

interface MangaCardProps {
    _id: string;
    title: string;
    cover_image_url: string;
    author: string;
    genres: string[];
}

const MangaCard: React.FC<MangaCardProps> = ({
    _id,
    title,
    cover_image_url,
    author,
    genres,
}) => {
    return (
        <Link
            to={`/manga/${_id}`}
            className="block w-full"
        >
            <div className="relative pb-[150%] bg-white rounded-md shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <img
                    src={cover_image_url}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h2 className="text-lg font-bold text-white truncate">{title}</h2>
                    <p className="text-sm text-gray-300 mb-1 truncate">{author}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {genres.slice(0, 2).map((genre, index) => (
                            <span 
                                key={index}
                                className="bg-purple-500 bg-opacity-70 text-white px-2 py-1 rounded-full text-[10px]" 
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default MangaCard