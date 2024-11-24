import React from "react";
import { useParams } from "react-router-dom";
import CommingSoon from "../components/CommingSoon";



const MangaPage: React.FC = () => {
    const { mangaId } = useParams<{ mangaId: string }>();

    return (
        <div>
            <CommingSoon
                text={"Manga Page Is Coming Soon"}
            />
            <p
                className="text-center text-2xl font-medium"
            >
                Manga ID: ${mangaId}
            </p>
        </div>
    );
};

export default MangaPage;
