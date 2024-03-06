import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMangaModelData } from "../interfaces/MangaModelInterface";
import MangaCard from "../components/DetailManga.component";
import { LoadingDisplayManga } from "../components/LoadingDisplayManga.component";
import axios from "axios";

function SingleManga() {
  const { id } = useParams<{ id: string }>();
  const [singleManga, setSingleManga] = useState<SingleMangaModelData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/manga/${id}`
        );
        const mangaData = response.data.data as SingleMangaModelData;
        setSingleManga(mangaData);
      } catch (error) {
        console.error("Error fetching single manga:", error);
      }
    };
    fetchData();
    return () => {
      /* TODO() */
    };
  }, [id]);

  if (!singleManga) {
    return <LoadingDisplayManga />;
  }

  return <MangaCard manga={singleManga} />;
}

export default SingleManga;
