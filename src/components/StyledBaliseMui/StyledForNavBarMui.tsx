import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";


//TODO STYLED FOR NAV BAR
export const StyledBoxForNavBar = styled(Box)(/*( { visible }: { visible: boolean }) => ( */{
    flexGrow: 1,
    position: "fixed",
    width: "100%",
    height: "80px",
    zIndex: "9999",
    transition: "top 0.3s",
    // top: visible ? 0 : "-80px",
})/* ) */;

export const StyledTypographyForNavBar = styled(Typography)({
    flexGrow: 1, 
    color: "white", 
    fontWeight: "bold",
});

export const StyledDivForTabletInCartIcon = styled("div")({
    background: "#d34040",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: "1.5rem",
    height: "1.5rem",
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: "translate(20%, 30%)",
    fontWeight: "bold"
});


export const StyledForLinkInNav = styled(Link)({
    textDecoration: "none", 
    color: "white"
});
