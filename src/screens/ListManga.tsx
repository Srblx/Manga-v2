import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";
import { MangaModelData } from "../interfaces/MangaModelInterface";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  StyledBoxContentSearchBar,
  StyledDivContentBtnScrollToTop,
  StyledDivContentMangaCard,
  StyledStackContentBoxSearchBar,
  StyledStackForAllCardManga,
  Styledh1ForListManga,
} from "../components/StyledBaliseMui/StyledForListManga";
import { MangaCard } from "../components/CardManga.component";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { ErrorDisplayManga } from "../components/ErrorDisplayMangaList.component";
import { LoadingDisplayManga } from "../components/LoadingDisplayManga.component";
import ScrollToTopButton from "../components/BtnScrollTop.component";

export function ListManga() {
  const { ref, inView } = useInView();
  const messageError = "An error occurred while retrieving the mangas.";
  const networkError = "Network response was not ok.";
  const [searchValue, setSearchValue] = useState("");
  const queryKey = searchValue ? ["manga", searchValue] : ["manga"];
  const inputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const { firstname, lastname } = userData;
      setUserName(`${firstname} ${lastname} `);
    }
  }, []);

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
  }, [inputRef.current]);

  const fetchManga = async (
    { pageParam }: { pageParam: number },
    searchValue: string
  ): Promise<{ data: MangaModelData; pagination: any }> => {
    const apiUrl = `https://api.jikan.moe/v4/manga?sfw=true&page=${pageParam}${
      searchValue ? `&q=${searchValue}` : ""
    }`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(networkError);
    }
    return response.json();
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
        sx={{ gap: "1rem 0"}}
      >
        {(page.data as MangaModelData[]).map((manga) => {
          return (
            <StyledDivContentMangaCard ref={ref} key={manga.mal_id} >
              <MangaCard key={manga.mal_id} manga={manga} price={19.98} isAuthenticated={userName !== ""}/>
            </StyledDivContentMangaCard>
          );
        })}
      </StyledStackForAllCardManga>
    );
  });

  return (
    <>
      <Styledh1ForListManga><span style={{color: "rgb(68, 68, 68)"}}>Welcom {userName}</span><br />TO THE MANGA LIBRARY</Styledh1ForListManga>
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
