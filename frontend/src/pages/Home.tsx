import React, { useEffect, useState } from "react";
import MangaCard from "../components/MangaCard";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import MangaDetailedCard from "../components/MangaDetailedCard";
import { getAllManga } from "../services/api";



const Home: React.FC = () => {

    const [latestManga, setLatestManga] = useState<any[]>([]);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const latest = await getAllManga();
                setLatestManga(latest.data);
                console.log("Successfully fetched latest manga");
            } catch (error) {
                console.log(error)
            }
        };

        fetchLatest();
    },[]);

    return (
        <div>
            <HeroBanner />
            <main className="container mx-auto px-4 py-8">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Weekly Spotlight Section */}
                    <div>
                        <div className="pb-5">
                            <h2 className="text-2xl font-bold mb-4">Weekly Spotlight</h2>
                            <div className="w-[27%] h-1 bg-purple-500 mb-4"></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {latestManga.slice(0, 9).map((manga) => (
                                <div key={manga.id} className="w-full max-w-[200px]">
                                    <MangaCard {...manga} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trendings Section */}
                    <div>
                        <div className="pb-5">
                            <h2 className="text-2xl font-bold mb-4">New & Trending</h2>
                            <div className="w-[25%] h-1 bg-purple-500 mb-4"></div>
                        </div>
                        <div className="space-y-4">
                            {latestManga.slice(0, 5).map((trending, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 rounded-sm hover:shadow-md"
                                >
                                    <div key={index} className="w-full">
                                        <MangaDetailedCard {...trending} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
