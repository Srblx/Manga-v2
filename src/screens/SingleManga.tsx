import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMangaModelData } from "../interfaces/MangaModelInterface";
import MangaCard from "../components/DetailManga.component";
import { LoadingDisplayManga } from "../components/LoadingDisplayManga.component";


function SingleManga() {
  const { id } = useParams<{ id: string }>();
  const [singleManga, setSingleManga] = useState<SingleMangaModelData | null>(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga/${id}`).then((response) => {
      response.json().then((json) => {
        const mangaData = json.data as SingleMangaModelData;
        setSingleManga(mangaData);
      });
    });

    return () => {
    };
  }, [id]);

  if (!singleManga) {
    return <LoadingDisplayManga />;
  }

  return <MangaCard manga={singleManga} />;
}

export default SingleManga;
