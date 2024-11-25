import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { getManga } from "../services/api";



interface MangaProps {
	_id: string;
	title: string;
	cover_image_url: string;
	author: string;
	genres: string[];
	chapters: string[];
	description: string,
	status: string
}

const MangaPage: React.FC = () => {
	const { mangaId } = useParams<{ mangaId: string }>();
	const [manga, setManga] = useState<MangaProps>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchManga = async () => {
			try {
				const data = await getManga(mangaId!);
				setManga(data.data);
			} catch (error) {
				console.error("Error fetching manga data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchManga();
	}, [mangaId]);

	if (loading) {
		return <div className="text-center p-4">Loading...</div>;
	}

	if (!manga) {
		return <div className="text-center p-4">Failed to load manga details.</div>;
	}

	return (
		<div>
			<div className="min-h-screen p-4 m-10 md:p-8">
				<main className="container mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-out_forwards]">
					{/* Manga Header Section */}
					<section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[300px,1fr]">
						{/* Cover Image */}
						<div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-[#e8e8ed]">
							<img
								src={manga.cover_image_url}
								alt="Manga Cover"
								className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
						</div>

						{/* Manga Info */}
						<div className="mt-8 space-y-6">
							<div>
								<h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl text-[#1d1d1f]">
									{manga.title}
								</h1>
								<p className="mt-2 text-lg text-[#86868b]">by {manga.author}</p>
							</div>

							{/* Genres */}
							<div className="flex flex-wrap gap-2">
								{manga.genres.map((genre: string) => (
									<span
										key={genre}
										className="rounded-full bg-[#e8e8ed] px-3 py-1 text-sm font-medium text-[#6e6e73] transition-colors hover:bg-[#d2d2d7]"
									>
										{genre}
									</span>
								))}
							</div>

							{/* Stats */}
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
								<div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-lg p-4">
									<p className="text-sm text-[#86868b]">Chapters</p>
									<p className="text-2xl font-semibold text-[#1d1d1f]">{manga.chapters.length.toString()}</p>
								</div>
								<div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-lg p-4">
									<p className="text-sm text-[#86868b]">Status</p>
									<p className="text-2xl font-semibold text-[#1d1d1f]">{manga.status}</p>
								</div>
							</div>
						</div>
					</section>

					{/* Description Section */}
					<section className="bg-white/70 backdrop-blur-lg border border-white/20 mx-auto mb-10 max-w-6xl p-8 text-center">
						<h2 className="mb-6 text-2xl font-semibold text-[#1d1d1f]">Description</h2>
						<p className="text-lg text-[#6e6e73] leading-relaxed">
							{manga.description}
						</p>
						<button className="mt-4 text-base font-medium text-[#86868b] hover:text-[#1d1d1f]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="mx-auto"
							>
								<path d="M12 5v14" />
								<path d="m19 12-7 7-7-7" />
							</svg>
						</button>
					</section>

					{/* Chapters Section */}
					<section className="bg-white/70 backdrop-blur-lg border border-white/20 mx-auto mb-8 max-w-6xl p-8">
						<h2 className="mb-8 text-2xl font-semibold text-[#1d1d1f]">Chapters</h2>
						<div className="space-y-4">
							{manga.chapters.length > 0 ? (
								manga.chapters.map((chapter: any, index: number) => (
									<a
										key={index}
										href={chapter.url || "#"}
										className="flex justify-between items-center py-2 border-b border-[#ff00ff] no-underline hover:border-[#ff009f]"
									>
										<span className="text-lg text-[#1d1d1f]">
											{chapter.title || `Chapter ${index + 1}`}
										</span>
									</a>
								))
							) : (
								<p className="text-lg text-[#86868b]">No chapters available.</p>
							)}
						</div>
					</section>
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default MangaPage;
