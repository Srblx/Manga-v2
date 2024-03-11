import { IconButton, Stack, styled } from "@mui/material";
import {
  AddNewsForm,
  LikesModel,
  NewsModel,
} from "../interfaces/NewsModel.interface";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UserContext from "../context/UserContext";
import ApiAxios from "../utils/axios.api";
import { AlertAuthorizeDeleteNews } from "./UnderComponents/BoxAlertMessage.component";
import { ADMIN } from "../utils/constant.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingDisplayManga } from "./LoadingDisplayManga.component";
import { ErrorDisplayManga } from "./ErrorDisplayMangaList.component";
import { ApiRoutes, URL_BASE_NEST_SKELETON } from "../utils/routeApi.utils";
import UpdateNewsModal from "./UnderComponents/ModalEditNews.component";

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

type NewsItemProps = {
  newsModel: NewsModel;
  likes: LikesModel[] | undefined;
};

export function CardNews({ newsModel, likes = [] }: NewsItemProps) {
  const { user } = useContext(UserContext);

  const [allLikesForOneNews, setAllLikesForOneNews] = useState<number>(
    likes.length
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isAdmin] = useState(user?.role === ADMIN);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [formData, setFormData] = useState<AddNewsForm>({});

  const {
    data: newsData,
    refetch: refetchNews,
    isError,
    isPending,
    error,
  } = useQuery<NewsModel[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await ApiAxios.get(ApiRoutes.NEWS);
      return response.data;
    },
    gcTime: 5000,
  });
  const currentNews = newsData?.find((news) => news.id === newsModel.id);

  const { data: likeData } = useQuery<LikesModel[]>({
    queryKey: ["likes"],
    queryFn: async () => {
      const response = await ApiAxios.get(ApiRoutes.LIKES);
      return response.data;
    },
    gcTime: 5000,
  });

  const [likeByMe, setLikeByMe] = useState<LikesModel | undefined>(
    likeData?.find((like) => like.user.id === user?.id)
  );

  const { mutate: createLikeMutation } = useMutation({
    mutationFn: async (option: { newsId: string; userId: string }) => {
      const response = await ApiAxios.post(ApiRoutes.LIKES, {
        user: option.userId,
        news: option.newsId,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setLikeByMe(data);
      setAllLikesForOneNews((prev) => prev + 1);
    },
    onError: (error) => {
      console.error("Error creating like:", error);
    },
  });

  const { mutate: deleteLikeMutation } = useMutation({
    mutationFn: async (likeId: string) => {
      await ApiAxios.delete(`${ApiRoutes.LIKES_ + likeId}`);
      return likeId;
    },
    onSuccess: () => {
      setLikeByMe(undefined);
      setAllLikesForOneNews((prev) => prev - 1);
    },
    onError: (error) => {
      console.error("Error deleting like:", error);
    },
  });

  const { mutate: deleteNewsMutation } = useMutation({
    mutationFn: async (newId: string) => {
      const response = await ApiAxios.delete(`${ApiRoutes.NEWS + newId}`);
      return response.data;
    },
    onSuccess: () => {
      refetchNews();
    },
    onError: () => {
      console.error("Error deleting news:", error);
    },
  });

  const onClickForLike = async () => {
    if (!user?.id) return;
    if (!likeByMe) {
      createLikeMutation({
        newsId: newsModel.id,
        userId: user?.id,
      });
    } else {
      deleteLikeMutation(likeByMe.id);
    }
  };

  useEffect(() => {
    setAllLikesForOneNews(likes.length);
    setLikeByMe(likes?.find((like) => like.user.id === user?.id));
  }, [likes, user?.id]);

  const handleDeleteNews = async (newsId: string) => {
    try {
      deleteNewsMutation(newsId);
      refetchNews();
    } catch (error) {
      console.error("Delete unauthorized", error);
    }
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenEditModal = async () => {
    const response = await ApiAxios.get(ApiRoutes.NEWS + newsModel.id);
    setFormData(response.data);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate: updateNewsMutation } = useMutation({
    mutationFn: async ({
      newsId,
      formData,
    }: {
      newsId: string;
      formData: AddNewsForm;
    }) => {
      const response = await ApiAxios.patch(
        URL_BASE_NEST_SKELETON + ApiRoutes.NEWS + newsId,
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("News updated successfully", data);
      refetchNews();
    },
    onError: (error) => {
      console.error("Error updating news:", error);
    },
  });

  const handleSubmitUpdate = async () => {
    updateNewsMutation({ newsId: newsModel.id, formData });
  };

  if (isPending) return <LoadingDisplayManga />;
  if (isError) return <ErrorDisplayManga error={error.message} />;
  return (
    <StyledDivContentOneItem>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton onClick={handleOpenEditModal}>
          <EditIcon sx={{ color: "blue" }} />
        </IconButton>
        {isAdmin && (
          <IconButton onClick={handleOpenDeleteModal}>
            <DeleteForeverIcon sx={{ color: "red" }} />
          </IconButton>
        )}
      </Stack>
      <StyledImgNews src={currentNews?.imageUrl} alt="news" />
      <Stack direction="row" alignItems="center" justifyContent="center">
        <IconButton onClick={onClickForLike}>
          {likeByMe ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "gray" }} />
          )}
        </IconButton>
        <p>
          {allLikesForOneNews} {allLikesForOneNews === 1 ? "like" : "likes"}
        </p>
      </Stack>
      <h2>{currentNews?.title}</h2>
      <StyledStackContentDescription>
        <p>{currentNews?.content}</p>
      </StyledStackContentDescription>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <p>
          <strong style={{ color: "blue" }}>
            {format(new Date(newsModel.createdAt), "dd/MM/yyyy")}
          </strong>
        </p>
        <p>
          <strong>{`${currentNews?.user.firstname} ${currentNews?.user.lastname}`}</strong>
        </p>
      </Stack>
      <AlertAuthorizeDeleteNews
        openModal={openDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        handleDeleteNews={() => handleDeleteNews(newsModel.id)}
        handleOpenModal={() => console.log("hello")}
      />
      <UpdateNewsModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        formData={formData}
        handleChange={handleChange}
        image={formData.imageUrl}
        handleSubmit={handleSubmitUpdate}
      />
    </StyledDivContentOneItem>
  );
}
