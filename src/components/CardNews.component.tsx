import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { LikesModel, NewsModel } from "../interfaces/NewsModel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";
import { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ApiAxios from "../utils/axios.api";

const StyledDivContentOneItem = styled("div")({
  background: "white",
  margin: "2rem",
  padding: ".5rem",
  border: "solid .35rem black",
  borderRadius: "10px",
  textAlign: "center",
  width: "40%",
});

const StyledImgNews = styled("img")({
  maxWidth: "100%",
  height: "auto",
  borderRadius: "5px",
  maxHeight: "250px",
});

const StyledStackContentDescription = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem 0",
});

type NewsItemProps = {
  newsModel: NewsModel;
  likes: LikesModel[];
  onDelete: (newsId: string) => void;
};

export function CardNews({ newsModel, likes, onDelete }: NewsItemProps) {
  const { user } = useContext(UserContext);
  const [likeByMe, setLikeByMe] = useState<LikesModel | undefined>(
    likes.find((like) => like.user.id === user?.id)
  );
  const [totalLikes, setTotalLikes] = useState<number>(likes.length);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const onClickForLike = async () => {
    try {
      // if (!user?.token) {
      //   alert("Please log in to like a news");
      //   return;
      // }
      if (!likeByMe) {
        const response = await ApiAxios.post(
          "likes",
          {
            news: newsModel.id,
            user: user?.id,
          }
        );
        setLikeByMe(response.data._id);
        setTotalLikes(totalLikes + 1);
      } else {
        const likedId = likeByMe;
        await ApiAxios.delete(`likes/${likedId}`);
        setLikeByMe(undefined);
        setTotalLikes(totalLikes - 1);
      }
    } catch (error) {
      console.error("Erreur lors de la création/suppression du like", error);
    }
  };

  const handleDeleteNews = () => {
    onDelete(newsModel.id);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOnClickEdit = () => {
    navigate("/editNews")
  }
  return (
    <>
      <StyledDivContentOneItem>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <IconButton onClick={handleOpenModal}>
            <DeleteForeverIcon sx={{ color: "red" }} />
          </IconButton>
          <IconButton onClick={handleOnClickEdit}>
            <EditIcon
              sx={{ color: "blue" }}
              
            />
          </IconButton>
        </Stack>
        <StyledImgNews src={newsModel.imageUrl} alt="News"></StyledImgNews>
        <Stack
          direction="row"
          sx={{ alignSelf: "center", alignItems: "center" }}
        >
          <IconButton onClick={onClickForLike} sx={{ alignSelf: "center" }}>
            {!likeByMe ? (
              <FavoriteBorderIcon sx={{ color: "gray" }} />
            ) : (
              <FavoriteIcon sx={{ color: "red" }} />
            )}
          </IconButton>
          <p>
            {totalLikes} {totalLikes > 1 ? "Likes" : "Like"}
          </p>
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
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              <strong>Are you sure you want to delete this news?</strong>
            </Typography>
            <Button
              variant="contained"
              sx={{ background: "red", margin: ".8rem .5rem" }}
              onClick={() => {
                handleDeleteNews();
                handleCloseModal();
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{ background: "blue", margin: ".8rem .5rem" }}
              onClick={handleCloseModal}
            >
              No
            </Button>
          </Box>
        </Modal>
      </StyledDivContentOneItem>
    </>
  );
}
