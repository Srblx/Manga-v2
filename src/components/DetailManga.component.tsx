import { Stack } from "@mui/material";
import { SingleMangaModelData } from "../interfaces/MangaModelInterface";
import { MangaAuthorModel } from "../interfaces/MangaModelInterface";
import { Link } from "react-router-dom";

import { StyledCustomButton, StyledDivLeftColumn, StyledDivRightColumn, StyledStackContentAllDetail, StyledStackForTitle } from "./StyledBaliseMui/StyledForDetailManga";
import React from "react";

type SingleMangaItemProps = {
    manga: SingleMangaModelData;
  }

  const BackHomeLink = React.memo(() => (
    <Link to={`/`}>
        <StyledCustomButton>Back to Home</StyledCustomButton>
    </Link>
));

const MangaCard = React.memo(({ manga }: SingleMangaItemProps) => {
    console.log(manga);

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
                        <li>More details : <a href={manga.url}>{manga.url}</a></li>
                        <BackHomeLink />
                    </Stack>
                </StyledDivRightColumn>
                <StyledDivLeftColumn>
                    <div style={{ paddingTop: ".4rem" }}>Authors :
                        {manga.authors.map((author: MangaAuthorModel, index: number) => (
                            <ul key={index}>
                                <li>{author.name}</li>
                            </ul>
                        ))}
                    </div>
                    {manga.genres && manga.genres.length > 0 && (
                        <div>
                            Type : {manga.genres.map((g, index) => (
                                <ul key={index}>
                                    <li> {g.name}</li>
                                </ul>
                            ))}
                        </div>
                    )}
                    {manga.themes && manga.themes.length > 0 && (
                        <div>
                            Topics : {manga.themes.map((t, index) => (
                                <ul key={index}>
                                    <li> {t.name}</li>
                                </ul>
                            ))}
                        </div>
                    )}
                    <br/>
                    <div style={{ textAlign: "center" }}>
                        {manga.synopsis && manga.synopsis.length > 0 && (
                            <div>
                                <p><strong>Sinopsis :</strong></p>
                                <br/>
                                {manga.synopsis}
                            </div>
                        )}
                        <br/>
                        {manga.background && manga.background.length > 0 && (
                            <div>
                                <p><strong>Background :</strong> </p>
                                <br/>
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