import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MangaCard from "../components/DetailManga.component";
import { LoadingDisplayManga } from "../components/LoadingDisplayManga.component";
import { SingleMangaModelData } from "../interfaces/MangaModel.interface";
import { URL_BASE_MANGA } from "../utils/routeApi.utils";

function SingleManga() {
  const { id } = useParams<{ id: string }>();
  const [singleManga, setSingleManga] = useState<SingleMangaModelData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_BASE_MANGA + id}`);
        const mangaData = response.data.data as SingleMangaModelData;
        setSingleManga(mangaData);
      } catch (error) {
        console.error("Error fetching single manga:", error);
      }
    };
    fetchData();
    return () => {};
  }, [id]);

  if (!singleManga) {
    return <LoadingDisplayManga />;
  }

  return <MangaCard manga={singleManga} />;
}

export default SingleManga;
