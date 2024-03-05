import axios from "axios";
import { useEffect, useState } from "react";
import { NewsModel } from "../interfaces/NewsModel";
import { Stack } from "@mui/material";
import {
  StyledDivContentOneItem,
  StyledH1,
  StyledImgNews,
  StyledStackContentDescription,
  StyledStackContentItem,
} from "../components/StyledBaliseMui/StyledForNews";
import { format } from 'date-fns';

export function ShowNews(){
    const [newsData, setNewsData] = useState<NewsModel[]>([]);

    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/news");
          console.log("response.data.data : ", response.data[0]);
          setNewsData(response.data);
          console.log("setNewsData : ", setNewsData);
        } catch (error: any) {
          throw new Error("Fetch news error" + error.message);
        }
      };
  
      fetchNews();
    }, []);
  
    return (
      <>
        <StyledH1>
          Welcome to News page ! 
        </StyledH1>
        {
          <StyledStackContentItem>
            {newsData?.map((newsItem, index) => (
              <StyledDivContentOneItem key={index}>
                <StyledImgNews src={newsItem.imageUrl} alt="News"/>
                <h2>{newsItem.title}</h2>
                <StyledStackContentDescription sx={{}}>
                  <p>{newsItem.content}</p>
                </StyledStackContentDescription>
                <Stack
                  direction="row"
                  sx={{ // xCommx tu peux utiliser les props de Stack justifyContent et alignItems
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>
                    <strong style={{ color: "blue" }}>
                    {format(new Date(newsItem.createdAt), "dd/MM/yyyy")}
                    </strong>
                  </p>
                  <p>
                    <strong>{`${newsItem.user.firstname} ${newsItem.user.lastname}`}</strong>
                  </p>
                </Stack>
              </StyledDivContentOneItem>
            ))}
          </StyledStackContentItem>
        }
      </>
    );
}