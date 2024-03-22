import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import {
  MangaAuthorModel,
  SingleMangaModelData,
} from "../interfaces/MangaModel.interface";
import { Pages } from "../utils/route.utils";

const StyledStackForTitle = styled(Stack)({
  width: "100%",
  textAlign: "center",
  fontWeight: "bold",
});

const StyledStackContentAllDetail = styled(Stack)({
  background: "rgba(204, 204, 204, 0.936)",
  borderRadius: "10px",
  flexDirection: "row",
  columnWidth: "10em",
  columnRule: "2px solid black",
  padding: ".5rem",
  margin: "5rem 1rem",
});

const StyledDivRightColumn = styled("div")({
  flex: "1",
  textAlign: "center",
  paddingRight: ".5rem",
  borderRight: "3px solid #d34040",
});

const StyledDivLeftColumn = styled("div")({
  flex: "2",
  paddingLeft: ".7rem",
});

const StyledCustomButton = styled("button")({
  background: "#2262f7",
  padding: "5px",
  border: "2px solid black",
  borderRadius: "5px",
  color: "white",
  fontSize: "large",
  marginTop: "1.5rem",
});

const StyledLi = styled("li")({
  color: "black",
});

type SingleMangaItemProps = {
  manga: SingleMangaModelData;
};

const BackHomeLink = React.memo(() => (
  <Link to={Pages.HOME}>
    <StyledCustomButton>Back to Home</StyledCustomButton>
  </Link>
));

const MangaCard = memo(({ manga }: SingleMangaItemProps) => {
  console.log("manga : ", manga);
  return (
    <Stack sx={{ marginTop: "2rem" }}>
      <StyledStackForTitle>
        <h1>{manga.title}</h1>
      </StyledStackForTitle>
      <StyledStackContentAllDetail>
        <StyledDivRightColumn>
          <div
            style={{ border: "solid 5px black", marginBottom: ".3rem" }}
          ></div>
          <Stack>
            <img
              src={manga.images.jpg.image_url}
              alt="Manga poster"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
            <br />
            <StyledLi>Manga popularity : {manga.popularity}</StyledLi>
            <br />
            <StyledLi>Manga status : {manga.status}</StyledLi>
            <br />
            <StyledLi>Manga rank : {manga.rank}</StyledLi>
            <br />
            <StyledLi>Manga score : {manga.scored}</StyledLi>
            <br />
            <StyledLi>Supporter community : {manga.members}</StyledLi>
            <br />
            <StyledLi>
              More details : <a href={manga.url}>{manga.url}</a>
            </StyledLi>
            <BackHomeLink />
          </Stack>
        </StyledDivRightColumn>
        <StyledDivLeftColumn>
          <div style={{ border: "solid 5px black" }}></div>
          <div style={{ paddingTop: ".4rem" }}>
            Authors :
            <ul>
              {manga.authors.map((author: MangaAuthorModel, index: number) => (
                <StyledLi key={index}>{author.name}</StyledLi>
              ))}
            </ul>
          </div>
          {manga.genres && manga.genres.length > 0 && (
            <div>
              Type :{" "}
              <ul>
                {manga.genres.map((g, index) => (
                  <StyledLi key={index}> {g.name}</StyledLi>
                ))}
              </ul>
            </div>
          )}
          {manga.themes && manga.themes.length > 0 && (
            <div>
              Topics :{" "}
              <ul>
                {manga.themes.map((t, index) => (
                  <StyledLi key={index}> {t.name}</StyledLi>
                ))}
              </ul>
            </div>
          )}
          <br />
          <div style={{ textAlign: "center", color: "black" , marginTop: "5rem"}}>
            {manga.synopsis && manga.synopsis.length > 0 && (
              <div>
                <p>
                  <strong>Sinopsis :</strong>
                </p>
                <br />
                {manga.synopsis}
              </div>
            )}
            <br />
            {manga.background && manga.background.length > 0 && (
              <div>
                <p>
                  <strong>Background :</strong>{" "}
                </p>
                <br />
                {manga.background}
              </div>
            )}
          </div>
        </StyledDivLeftColumn>
      </StyledStackContentAllDetail>
    </Stack>
  );
});

export default MangaCard;
