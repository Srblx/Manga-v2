import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";
import { MangaModelData } from "../interfaces/MangaModelInterface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MangaCard } from "../components/CardManga.component";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { ErrorDisplayManga } from "../components/ErrorDisplayMangaList.component";
import { LoadingDisplayManga } from "../components/LoadingDisplayManga.component";
import ScrollToTopButton from "../components/BtnScrollTop.component";
import axios from "axios";
import { Box, Stack, styled } from "@mui/material";
import UserContext from "../context/UserContext";


const StyledStackForAllCardManga = styled(Stack)({
  justifyContent: "center",
  margin: "15px",
  padding: "10px 10px",
});

const StyledDivContentMangaCard = styled("div")({
  border: "solid 4px white",
  margin: "2px",
  borderRadius: "10px",
});

const Styledh1ForListManga = styled("h1")({
  marginTop: "4.5rem",
  color: "black",
  paddingTop: "1rem",
  background: "white",
  width: "100%",
  textAlign: "center",
});

const StyledStackContentBoxSearchBar = styled(Stack)({
  background: "gray",
  padding: ".5rem",
  width: "50%",
  display: "contents",
  justifyContent: "center",
  alignItems: "center",
});

const StyledBoxContentSearchBar = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "2rem auto ",
  alignItems: "center",
  background: "white",
  paddingLeft: ".5rem",
  borderRadius: "15px",
  width: "50%",
});

const StyledDivContentBtnScrollToTop = styled("div")({
  position: "fixed",
  bottom: "2rem",
  right: "1rem",
});

export function ListManga() {
  const { ref, inView } = useInView();
  const messageError = "An error occurred while retrieving the mangas.";
  const networkError = "Network response was not ok.";
  const [searchValue, setSearchValue] = useState("");
  const queryKey = searchValue ? ["manga", searchValue] : ["manga"];
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useContext(UserContext);


  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const searchObservable$ = fromEvent<ChangeEvent<HTMLInputElement>>(
        inputElement,
        "input"
      ).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((event) => event.target.value)
      );
      const subscription = searchObservable$.subscribe((value) => {
        setSearchValue(value);
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);


  const fetchManga = async (
    { pageParam }: { pageParam: number },
    searchValue: string
  ): Promise<{ data: MangaModelData; pagination: any }> => {
    const apiUrl = `https://api.jikan.moe/v4/manga?sfw=true&page=${pageParam}${
      searchValue ? `&q=${searchValue}` : ""
    }`;

    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error(networkError);
    }
  };

  const {
    data: dataFromQuery,
    status,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => fetchManga({ pageParam }, searchValue),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.current_page + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const content = dataFromQuery?.pages.map((page: any, index) => {
    return (
      <StyledStackForAllCardManga
        direction="row"
        spacing={1}
        flexWrap="wrap"
        key={index}
        sx={{ gap: "1rem 0" }}
      >
        {(page.data as MangaModelData[]).map((manga) => {
          return (
            <StyledDivContentMangaCard ref={ref} key={manga.mal_id}>
              <MangaCard
                key={manga.mal_id}
                manga={manga}
                price={19.98}
                isAuthenticated={!!user}
              />
            </StyledDivContentMangaCard>
          );
        })}
      </StyledStackForAllCardManga>
    );
  });

  return (
    <>
      <Styledh1ForListManga>
        <span style={{ color: "rgb(68, 68, 68)" }}>Welcom {user?.firstname}</span>
        <br />
        TO THE MANGA LIBRARY
      </Styledh1ForListManga>
      <StyledStackContentBoxSearchBar>
        <StyledBoxContentSearchBar>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search a manga by title"
            variant="outlined"
            sx={{ width: "100%", "& fieldset": { border: "none" } }}
            inputRef={inputRef}
          />
        </StyledBoxContentSearchBar>
      </StyledStackContentBoxSearchBar>
      <>
        {status === "pending" && <LoadingDisplayManga />}
        {status === "error" && (
          <ErrorDisplayManga error={messageError + error.message} />
        )}
        {status !== "pending" && status !== "error" && content}
      </>
      {isFetchingNextPage && <LoadingDisplayManga />}
      <StyledDivContentBtnScrollToTop>
        <ScrollToTopButton />
      </StyledDivContentBtnScrollToTop>
    </>
  );
}
