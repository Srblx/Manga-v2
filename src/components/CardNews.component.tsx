import { IconButton, Stack, styled } from "@mui/material";
import { LikesModel, NewsModel } from "../interfaces/NewsModel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";
import { useState } from "react";
import axios from "axios";

const StyledDivContentOneItem = styled("div")({
  background: "white",
  margin: "2rem",
  padding: ".5rem",
  border: "solid .35rem black",
  borderRadius: "10px",
  textAlign: "center",
  width: "30%",

});

 const StyledImgNews = styled("img")({
  maxWidth: "100%",
  height: "auto",
  borderRadius: "5px",
  maxHeight: "250px"
});

 const StyledStackContentDescription = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem 0",
});

type NewsItemProps = {
  newsModel: NewsModel;
  likes: LikesModel[];
};

export function CardNews({ newsModel, likes }: NewsItemProps) {
  const [likeByMe, setLikeByMe] = useState<LikesModel | undefined>(likes.find((like) => like.user._id === localStorage.getItem('userID')));
  const [totalLikes, setTotalLikes] = useState<number>(likes.length);

  const onClickForLike = async () => {
    try {
      if (!likeByMe) {
        const response = await axios.post('http://localhost:3000/api/v1/likes', {
          news: newsModel._id,
          user: localStorage.getItem('userID')
        });
        setLikeByMe(response.data);
        setTotalLikes(totalLikes +1);
      } else {
        const likedId = likeByMe._id;
        console.log('likedId : ', likedId);
        await axios.delete(`http://localhost:3000/api/v1/likes/${likedId}`);
        setLikeByMe(undefined);
        setTotalLikes(totalLikes -1);
      }
    } catch (error) {
      console.error("Erreur lors de la création/suppression du like", error);
    }
  }

  return (
    <>
      <StyledDivContentOneItem >
        <StyledImgNews src={newsModel.imageUrl} alt="News" />
        <Stack
          direction="row"
          sx={{ alignSelf: "center", alignItems: "center" }}
        >
          <IconButton
            onClick={onClickForLike}
            sx={{ alignSelf: "center" }}
          >
            {!likeByMe ? (
              <FavoriteBorderIcon sx={{ color: "gray" }} />
            ) : (
              <FavoriteIcon sx={{ color: "red" }} />
            )}
          </IconButton>
          <p>{totalLikes} {totalLikes > 1 ? "Likes" : "Like" }</p>
        </Stack>
        <h2>{newsModel.title}</h2>
        <StyledStackContentDescription>
          <p>{newsModel.content}</p>
        </StyledStackContentDescription>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>
            <strong style={{ color: "blue" }}>
              {format(new Date(newsModel.createdAt), "dd/MM/yyyy")}
            </strong>
          </p>
          <p>
            <strong>{`${newsModel.user.firstname} ${newsModel.user.lastname}`}</strong>
          </p>
        </Stack>
      </StyledDivContentOneItem>
    </>
  );
}
