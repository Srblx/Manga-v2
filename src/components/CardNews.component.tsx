import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Stack, styled } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import {
  AddNewsForm,
  LikesModel,
  NewsModel,
} from "../interfaces/NewsModel.interface";
import ApiAxios from "../utils/axios.api";
import { ADMIN } from "../utils/constant.utils";
import { ApiRoutes, URL_BASE_NEST_SKELETON } from "../utils/routeApi.utils";
import { ErrorDisplayManga } from "./ErrorDisplayMangaList.component";
import { LoadingDisplayManga } from "./LoadingDisplayManga.component";
import UpdateNewsModal from "./ModalEditNews.component";
import { AlertAuthorizeDeleteNews } from "./Shared/BoxAlertMessage.component";

const StyledDivContentOneItem = styled("div")({
  background: "white",
  margin: "2rem",
  padding: ".5rem",
  border: "solid .35rem black",
  borderRadius: "10px",
  textAlign: "center",
  width: "40%",
  height: "100%",
  color: "black",
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

export function CardNews({ newsModel, likes = [] }: Readonly<NewsItemProps>) {
  const { user } = useContext(UserContext);
  const [allLikesForOneNews, setAllLikesForOneNews] = useState<number>(
    likes.length
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user?.role === ADMIN); // si pas d'utilisation du setIsAdmin, on peut directement declarer une const isAdmin = user?.role === ADMIN, et si c'est une operation un peut plus demandante comme une array find, c'est la bonne occasion d'utiliser useMemo (Pas le cas ici, mais c'est bon à savoir)
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
  const currentNews = newsData?.find((news) => news.id === newsModel.id); // currentNews deja present dans les props, pas besoin de l'avoir ici

  const { data: likeData, /* refetch: refetchLikes */ } = useQuery<LikesModel[]>({
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

  const [newsLikeByUser, setNewsLikeByUser] = useState<NewsModel[]>([]); // pas utilisé
  useEffect(() => {
    const userLikes = likeData?.filter((like) => like.user.id === user?.id);
    const newsLikedByUserTemp = userLikes?.map((like) => like.news);
    setNewsLikeByUser(newsLikedByUserTemp || []); // newsLikeByUser pas utilisé 
  }, [likeData, user?.id]);

  const { mutate: createLikeMutation } = useMutation({
    mutationFn: async (option: { newsId: string; userId: string }) => {
      const response = await ApiAxios.post(ApiRoutes.LIKES, {
        user: option.userId,
        news: option.newsId,
      });
      return response.data;
    },
    onSuccess: (_data, variables) => {
      console.log('variables : ', variables);
      // refetch likeData
      setLikeByMe(true); // declarer plutot une const avec un useMemo pour garder a jour cette variable plutot qu'un state, du coup plus besoin de set ici
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
      // refetch likeData
      setLikeByMe(undefined);  // declarer plutot une const avec un useMemo pour garder a jour cette variable plutot qu'un state, du coup plus besoin de set ici
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
      refetchNews(); // faire venir ce refetch des props, comme ca pas besoin de get les news dans ce component
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
    const updateData = {
      title: response.data.title,
      content: response.data.content,
      imageUrl: response.data.imageUrl,
    };
    setFormData(updateData);
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
    setOpenEditModal(false);
  };
  if (isPending) return <LoadingDisplayManga />;
  if (isError) return <ErrorDisplayManga error={error.message} />;
  return (
    <StyledDivContentOneItem>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton
          onClick={handleOpenEditModal}
          data-testid={`update-news-${newsModel.id}`}
          data-news-update-id={newsModel.id}
        >
          <EditIcon sx={{ color: "blue" }} />
        </IconButton>
        {isAdmin && (
          <IconButton
            onClick={handleOpenDeleteModal}
            data-testid={`delete-news-${newsModel.id}`}
            data-news-id={newsModel.id}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </IconButton>
        )}
      </Stack>
      <StyledImgNews src={currentNews?.imageUrl} alt="news" />
      <Stack direction="row" alignItems="center" justifyContent="center">
        <IconButton
          onClick={onClickForLike}
          data-testid={`like-news-${newsModel.id}`}
          data-news-like-id={newsModel.id}
        >
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
