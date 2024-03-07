import {
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import { LikesModel, NewsModel } from "../interfaces/NewsModel.interface";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";
import { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ApiAxios from "../utils/axios.api";
import { AlertAuthorizeDeleteNews } from "./UnderComponents/BoxAlertMessage.component";
import { ADMIN } from "../utils/constant.utils";

const StyledDivContentOneItem = styled("div")({
  background: "white",
  margin: "2rem",
  padding: ".5rem",
  border: "solid .35rem black",
  borderRadius: "10px",
  textAlign: "center",
  width: "40%",
  height: "100%",
});

const StyledImgNews = styled("img")({
  maxWidth: "100%",
  height: "auto",
  borderRadius: "5px",
  maxHeight: "250px",
  overflow: "hidden", 
});

const StyledStackContentDescription = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem 0", 
});

// const StyledBoxForModalConfirmDelete = styled(Box)({
//   left: "50%",
//   boxShadow: 24,
//   position: "absolute",
//   top: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "white",
//   p: 4,
//   textAlign: "center",
// });

// const StyledBoxForModalConfirmDelete = styled(Box)({
//   position: "absolute",
//   boxShadow: 24,
//   left: "50%",
//   top: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "white",
//   p: 4,
//   textAlign: "center",
// });

type NewsItemProps = {
  newsModel: NewsModel;
  likes: LikesModel[];
  onDelete: (newsId: string) => void;
  // onEdit: (news: NewsModel) => void
};

export function CardNews({ newsModel, likes, onDelete/* , onEdit */ }: NewsItemProps) {
  const { user } = useContext(UserContext);
  const [likeByMe, setLikeByMe] = useState<LikesModel | undefined>(
    likes.find((like) => like.user.id === user?.id)
  );
  const [allLikesForOneNews, setAllLikesForOneNews] = useState<number>(likes.length);
  // console.log('likes : ' + newsModel.title, likes);
  // console.log('allLikesForOneNews : ', allLikesForOneNews);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(user?.role === ADMIN);

  
  const onClickForLike = async () => {
    try {
      if (!likeByMe) {
        const response = await ApiAxios.post("likes", {
          news: newsModel.id,
          user: user?.id,
        });
        setLikeByMe(response.data._id);
        // console.log('likeByMe : ', response.data._id);
        setAllLikesForOneNews(previousState => previousState + 1);
      } else {
        const likedId = likeByMe;
        // console.log('likedId : ', likedId);
        await ApiAxios.delete(`likes/${likedId}`);
        setLikeByMe(undefined);
        setAllLikesForOneNews(previousState => previousState - 1);
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
    navigate(`/editNews`);
  };
// console.log('allLikes : ', likes);
  return (
    <>
      <StyledDivContentOneItem>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {isAdmin && (
            <IconButton onClick={handleOpenModal}>
              <DeleteForeverIcon sx={{ color: "red" }} />
            </IconButton>
          )}
          <IconButton onClick={handleOnClickEdit}>
            <EditIcon sx={{ color: "blue" }} />
          </IconButton>
        </Stack>
        <p>{newsModel.id}</p>
        <p>{likes.map((like) => like.id)}</p>
        <StyledImgNews src={newsModel.imageUrl} alt="News"/>
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
            {allLikesForOneNews} {allLikesForOneNews > 1 ? "Likes" : "Like"}
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
        {isAdmin && (
          <AlertAuthorizeDeleteNews
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            handleDeleteNews={handleDeleteNews}
            textButton="Yes"
          />
        )}
      </StyledDivContentOneItem>
    </>
  );
}
