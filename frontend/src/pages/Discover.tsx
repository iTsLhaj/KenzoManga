import React, { useState, useEffect } from "react";
import MangaCard from "../components/MangaCard";
import Footer from "../components/Footer";
import { getAllManga } from "../services/api";

interface Manga {
    _id: string;
    title: string;
    cover_image_url: string;
    author: string;
    genres: string[];
};

const Discover: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [mangaData, setMangaData] = useState<Manga[]>([]); // All fetched manga data
    const [mangas, setMangas] = useState<Manga[]>([]); // Mangas displayed on the current page
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const mangasPerPage = 15; // Set the number of mangas per page

    // Filter mangaData based on the search term
    const filteredMangas = searchTerm
        ? mangaData.filter((manga) =>
              manga.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : mangaData; // If no search term, show all mangas

    const totalPages = Math.ceil(filteredMangas.length / mangasPerPage); // Calculate total pages for the filtered data

    // Function to get mangas for the current page
    const getMangasForPage = (page: number) => {
        const offset = (page - 1) * mangasPerPage; // Calculate the index for the first manga on the page
        const pageMangas = filteredMangas.slice(offset, offset + mangasPerPage); // Slice the array to get mangas for the current page
        setMangas(pageMangas); // Update the mangas displayed
    };

    useEffect(() => {
        const fetchMangaData = async () => {
            try {
                const data = await getAllManga();
                setMangaData(data.data);
                console.log("Successfully fetched manga data");
            } catch (error) {
                console.log(error);
            }
        };

        fetchMangaData();
    }, []); // Only run once on component mount

    // Fetch mangas when the current page or search term changes, or after the data is fetched
    useEffect(() => {
        // Ensure that manga data is available before calling getMangasForPage
        if (mangaData.length > 0) {
            getMangasForPage(currentPage);
        }
    }, [currentPage, mangaData, searchTerm]); // Dependency on currentPage, mangaData, and searchTerm

    // Function to change the page
    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page); // Update current page
        }
    };

    return (
        <div>
            <div className="max-w-screen-xl mx-auto pt-28">
                {/* Search Bar */}
                <div className="flex justify-center items-center mb-5 border border-black rounded-sm hover:border-purple-600">
                    <input
                        type="text"
                        className="flex-1 p-3 text-lg outline-none border-none rounded-l-md"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    />
                    <button
                        className="p-3 text-lg text-black bg-white border-none rounded-r-md hover:text-purple-600 transition-colors"
                    >
                        Search
                    </button>
                </div>

                {/* Manga Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 py-14">
                    {mangas.length > 0 ? (
                        mangas.map((manga) => (
                            <div key={manga._id} className="w-full max-w-[250px]">
                                <MangaCard
                                    key={manga._id}
                                    _id={manga._id}
                                    title={manga.title}
                                    cover_image_url={manga.cover_image_url}
                                    author={manga.author}
                                    genres={manga.genres}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No mangas found</p> // Show a message if no mangas are available (either due to an empty filter or no data)
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="text-center mt-8">
                    <div className="inline-flex items-center space-x-4">
                        {/* Previous Page Button */}
                        <button
                            onClick={() => changePage(currentPage - 1)}
                            className="bg-white text-black text-lg py-2 px-4 border-b border-black hover:border-purple-600 hover:text-purple-600 transition-colors disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            {"<"}
                        </button>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => changePage(index + 1)}
                                className={`text-lg py-2 px-4 ${currentPage === index + 1 ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"} transition-colors`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        {/* Next Page Button */}
                        <button
                            onClick={() => changePage(currentPage + 1)}
                            className="bg-white text-black text-lg py-2 px-4 border-b border-black hover:border-purple-600 hover:text-purple-600 transition-colors disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Discover;
