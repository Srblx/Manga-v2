import { Stack } from "@mui/material";
import { SingleMangaModelData } from "../interfaces/MangaModelInterface";
import { MangaAuthorModel } from "../interfaces/MangaModelInterface";
import { Link } from "react-router-dom";
import React from "react";
import styled from "@emotion/styled";

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
  padding: ".5rem",
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

type SingleMangaItemProps = {
  manga: SingleMangaModelData;
};

const BackHomeLink = React.memo(() => (
  <Link to={`/`}>
    <StyledCustomButton>Back to Home</StyledCustomButton>
  </Link>
));

const MangaCard = React.memo(({ manga }: SingleMangaItemProps) => {
  return (
    <>
      <StyledStackForTitle>
        <h1>{manga.title}</h1>
      </StyledStackForTitle>
      <StyledStackContentAllDetail>
        <StyledDivRightColumn>
          <Stack>
            <img
              src={manga.images.jpg.image_url}
              alt="Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
            <br />
            <li>Manga popularity : {manga.popularity}</li>
            <br />
            <li>Manga status : {manga.status}</li>
            <br />
            <li>Manga rank : {manga.rank}</li>
            <br />
            <li>Manga score : {manga.scored}</li>
            <br />
            <li>Supporter community : {manga.members}</li>
            <br />
            <li>
              More details : <a href={manga.url}>{manga.url}</a>
            </li>
            <BackHomeLink />
          </Stack>
        </StyledDivRightColumn>
        <StyledDivLeftColumn>
          <div style={{ paddingTop: ".4rem" }}>
            Authors :
            {manga.authors.map((author: MangaAuthorModel, index: number) => (
              <ul key={index}>
                <li>{author.name}</li>
              </ul>
            ))}
          </div>
          {manga.genres && manga.genres.length > 0 && (
            <div>
              Type :{" "}
              {manga.genres.map((g, index) => (
                <ul key={index}>
                  <li> {g.name}</li>
                </ul>
              ))}
            </div>
          )}
          {manga.themes && manga.themes.length > 0 && (
            <div>
              Topics :{" "}
              {manga.themes.map((t, index) => (
                <ul key={index}>
                  <li> {t.name}</li>
                </ul>
              ))}
            </div>
          )}
          <br />
          <div style={{ textAlign: "center" }}>
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
    </>
  );
});

export default MangaCard;
