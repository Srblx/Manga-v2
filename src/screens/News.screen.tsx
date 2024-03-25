import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CardNews } from "../components/CardNews.component";
import LikedNewsModal from "../components/ModalLikedByUser.component";
import { StyledH1 } from "../components/StyledBaliseMui/H1.styled";
import UserContext from "../context/UserContext";
import { LikesModel, NewsModel } from "../interfaces/NewsModel.interface";
import ApiAxios from "../utils/axios.api";
import { ApiRoutes } from "../utils/routeApi.utils";

const StyledStackContentItem = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  background: "#ffffffb5",
});

const StyledStackContentMyAllFavorite = styled(Stack)({
  background: "#ffffffb5",
  paddingTop: ".5rem",
  justifyContent: "end",
  alignItems: "end",
});

const StyledButtonMyAllFavorite = styled(Button)({
  marginRight: ".5rem",
  background: "black",
  color: "#FF0001",
  "&:hover": {
    background: "#FF0001",
    color: "black",
  },
});

export function ShowNews() {
  const [openModalLikedByMe, setOpenModalLikedByMe] = useState(false);
  const user = useContext(UserContext);

  const { data: newsData } = useQuery<NewsModel[]>({ // refetchNews a metttre dans props de CardNews
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

  const handleOpenModalLikedByMe = () => {
    setOpenModalLikedByMe(true);
  };

  const handleCloseModalLikedByMe = () => {
    setOpenModalLikedByMe(false);
  };

  const [likedNews, setLikedNews] = useState<NewsModel[]>([]);

  useEffect(() => {
    const userLikes = allLikes?.filter(
      (like) => like.user.id === user?.user?.id
    );
    const newsLikedByUserTemp = userLikes?.map((like) => like.news);
    setLikedNews(newsLikedByUserTemp || []);
  }, [allLikes, user?.user?.id]);

  return (
    <>
      <StyledH1>News </StyledH1>
      <StyledStackContentMyAllFavorite>
        <StyledButtonMyAllFavorite
          variant="contained"
          onClick={handleOpenModalLikedByMe}
        >
          My <FavoriteIcon />
        </StyledButtonMyAllFavorite>
      </StyledStackContentMyAllFavorite>
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
      <LikedNewsModal
        open={openModalLikedByMe}
        handleClose={handleCloseModalLikedByMe}
        user={user.user}
        likedNews={likedNews}
      />
    </>
  );
}
