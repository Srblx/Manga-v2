import { useContext, useEffect, useState } from "react";
import { LikesModel, NewsModel } from "../interfaces/NewsModel";
import { CardNews } from "../components/CardNews.component";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import UserContext from "../context/UserContext";
import ApiAxios from "../utils/axios.api";

const StyledH1 = styled("h1")({
  width: "100%",
  background: "gray",
  marginTop: "4.5rem",
  textAlign: "center",
  padding: "2rem 0",
});

const StyledStackContentItem = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  background: "#ffffffb5",
});

export function ShowNews() {
  const [newsData, setNewsData] = useState<NewsModel[]>([]);
  const [islike, setIsLike] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [allLikes, setAllLikes] = useState<LikesModel[]>([]);
  const { user } = useContext(UserContext);
  // const [deleteNews, setDeleteNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await ApiAxios.get("news");
        setNewsData(response.data);
        return response.data; //! Pas obligatoire??
      } catch (error: any) {
        throw new Error("Fetch news error" + error.message);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await ApiAxios.get("likes");
        const newsLikes = response.data;
        setTotalLikes(newsLikes.length);
        setAllLikes(response.data);
        if (
          newsLikes.find(
            (like: LikesModel) =>
              like.user.id === user?.id
          )
        ) {
          setIsLike(true);
        }
      } catch (error) {
        throw new Error("Fetch like error");
      }
    };
    fetchLikes();
  }, []);

  const handleDeleteNews = async (newsId: string) => {
    try {
      await ApiAxios.delete(`news/${newsId}`);
      setNewsData(newsData.filter(news => news.id !== newsId));
    } catch (error) {
      console.error('Delete unauthorized', error);
    }
  };

  return (
    <>
      <StyledH1>Welcome to News page ! </StyledH1>
      {
        <StyledStackContentItem
          direction="row"
          flexWrap="wrap"
          sx={{ background: "red" }}
        >
          {newsData?.map((newsModel) => (
            <CardNews
              key={newsModel.id}
              newsModel={newsModel}
              onDelete={handleDeleteNews}
              likes={allLikes.filter((like) => {
                return like.news.id === like.user.id;
              })}
            />
          ))}
        </StyledStackContentItem>
      }
    </>
  );
}
