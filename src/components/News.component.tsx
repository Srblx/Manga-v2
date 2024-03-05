import axios from "axios";
import { useEffect, useState } from "react";
import { LikesModel, NewsModel } from "../interfaces/NewsModel";
import { CardNews } from "./CardNews.component";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/news");
        setNewsData(response.data);
        return response.data; //! Pas obligatoire??
      } catch (error: any) {
        throw new Error("Fetch news error" + error.message);
      }
    };

    fetchNews();
  }, []);

  const [islike, setIsLike] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [allLikes, setAllLikes] = useState<LikesModel[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/likes");
        const newsLikes = response.data
          setTotalLikes(newsLikes.length);
          setAllLikes(response.data);
          if (newsLikes.find((like: LikesModel) => like.user._id === localStorage.getItem("userID"))) {
            setIsLike(true);
          }
      } catch (error) {
        throw new Error("Fetch like error");
      }
    };
    fetchLikes();
  }, []);

    return (
      <>
        <StyledH1>Welcome to News page ! </StyledH1>
        {
          <StyledStackContentItem direction="row" flexWrap="wrap" sx={{background: "red"}}>
            {newsData?.map((newsModel) => (
              <CardNews
                key={newsModel._id}
                newsModel={newsModel}
                likes={allLikes.filter((like) => {
                  return like.news._id === newsModel._id
                })}
              />
            ))}
          </StyledStackContentItem>
        }
      </>
    );
  };

