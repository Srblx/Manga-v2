import { LikesModel, NewsModel } from "../interfaces/NewsModel.interface";
import { CardNews } from "../components/CardNews.component";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import ApiAxios from "../utils/axios.api";
import { StyledH1 } from "../components/StyledBaliseMui/H1.styled";
import { useQuery } from "@tanstack/react-query";
import { ApiRoutes } from "../utils/routeApi.utils";

const StyledStackContentItem = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  background: "#ffffffb5",
});

export function ShowNews() {
  const { data: newsData } = useQuery<NewsModel[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await ApiAxios.get(ApiRoutes.NEWS);
      return response.data;
    },
  });

  const { data: allLikes } = useQuery<LikesModel[]>({
    queryKey: ["likes"],
    queryFn: async () => {
      const response = await ApiAxios.get(ApiRoutes.LIKES);
      return response.data;
    },
  });

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
              likes={allLikes?.filter((like) => like.news.id === newsModel.id)}
            />
          ))}
        </StyledStackContentItem>
      }
    </>
  );
}
