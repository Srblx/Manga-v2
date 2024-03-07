import { useContext, useEffect, useState } from "react";
import { LikesModel, NewsModel } from "../interfaces/NewsModel.interface";
import { CardNews } from "../components/CardNews.component";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import UserContext from "../context/UserContext";
import ApiAxios from "../utils/axios.api";
import { StyledH1 } from "../components/StyledBaliseMui/H1.styled";

const StyledStackContentItem = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  background: "#ffffffb5",
});

export function ShowNews() {
  const [newsData, setNewsData] = useState<NewsModel[]>([]);
  const [allLikes, setAllLikes] = useState<LikesModel[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await ApiAxios.get("news");
        setNewsData(response.data);
        // return response.data; //! Pas obligatoire??
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
        // const newsLikes = response.data;
        // setTotalLikes(newsLikes.length);
        setAllLikes(response.data);
        // console.log('allLikes : ', allLikes);
      } catch (error) {
        throw new Error("Fetch like error");
      }
    };
    fetchLikes();
  }, []);

  const handleDeleteNews = async (newsId: string) => {
    try {
      await ApiAxios.delete(`news/${newsId}`);
      setNewsData(newsData.filter((news) => news.id !== newsId));
    } catch (error) {
      console.error("Delete unauthorized", error);
    }
  };

  console.log("allLikes : ", allLikes);
  // console.log('allLikes.filter : ', allLikes.filter((like) => {
  //           return like.news.id === like.user.id;
  //         }));
  return (
    <>
      <StyledH1>News </StyledH1>
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
                return (
                  like.news.id === newsModel.id
                ); /* && like.user.id === user?.id; */
              })}
              // onEdit={}
            />
          ))}
        </StyledStackContentItem>
      }
    </>
  );
}
