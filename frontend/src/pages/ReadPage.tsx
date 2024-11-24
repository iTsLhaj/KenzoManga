import React from "react";
import { useParams } from "react-router-dom";
import CommingSoon from "../components/CommingSoon";



const ReadPage: React.FC = () => {
    const { mangaId, chapterId } = useParams<{ mangaId: string, chapterId: string }>();

    return (
        <div>
            <CommingSoon
                text={"Manga Page Is Coming Soon"}
            />
            <p
                className="text-center text-2xl font-medium"
            >
                Manga ID: ${mangaId}, Chapter ID: ${chapterId}
            </p>
        </div>
    );
};

export default ReadPage;