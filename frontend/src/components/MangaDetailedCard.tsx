import React from "react";
import { Link } from "react-router-dom";

interface MangaDetailedCardProps {
    _id: string;
    title: string;
    cover_image_url: string;
    author: string;
    genres: string[];
}

const MangaDetailedCard: React.FC<MangaDetailedCardProps> = ({
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
            <div className="flex items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
                {/* Thumbnail */}
                <div className="w-32 h-32 flex-shrink-0 relative">
                    <img
                        src={cover_image_url}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Manga Details */}
                <div className="ml-6 flex-1">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-300">
                        {title}
                    </h3>

                    {/* Author */}
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium text-gray-700">Author:</span> {author}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {genres.slice(0, 3).map((genre, index) => (
                            <span
                                key={index}
                                className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MangaDetailedCard;
