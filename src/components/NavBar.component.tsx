import { useCallback, useContext, useEffect, useState } from "react";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { DrawerCart } from "./DrawerCart.component";
import PositionedMenu from "./MenuUser.component";
import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const StyledBoxForNavBar = styled(Box)({
  flexGrow: 1,
  position: "fixed",
  width: "100%",
  height: "80px",
  zIndex: "9999",
  transition: "top 0.3s",
});

const StyledTypographyForNavBar = styled(Typography)({
  flexGrow: 1,
  color: "white",
  fontWeight: "bold",
});

const StyledDivForTabletInCartIcon = styled("div")({
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
  fontWeight: "bold",
});

const StyledForLinkInNav = styled(Link)({
  textDecoration: "none",
  color: "white",
});

export default function NavBar() {
  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.pageYOffset
  );
  const [visible, setVisible] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const { cartQuantity } = useShoppingCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    if (user?.role === "ADMIN") setIsAdmin(true);
    else setIsAdmin(false);
  }, [user]);

  //! callBack pour eviter de la recréé a chaque rendu
  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.pageYOffset;
    setVisible(
      previousScrollPosition > currentScrollPosition ||
        currentScrollPosition < 10
    );
    setPreviousScrollPosition(currentScrollPosition);
  }, [previousScrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCloseCart = () => {
    setIsOpen(false);
  };

  return (
    <StyledBoxForNavBar sx={{ ...(visible ? { top: 0 } : { top: "-80px" }) }}>
      <AppBar position="static">
        <Toolbar sx={{ background: "black" }}>
          <PositionedMenu isAuthenticated={isAuthenticated} />
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={`/`}>Home</StyledForLinkInNav>
          </StyledTypographyForNavBar>
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={`/`}>Store</StyledForLinkInNav>
          </StyledTypographyForNavBar>
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={`news`}>News</StyledForLinkInNav>
          </StyledTypographyForNavBar>
          {isAdmin && (
            <StyledTypographyForNavBar variant="h6">
              <StyledForLinkInNav to={`addNews`}>Add News</StyledForLinkInNav>
            </StyledTypographyForNavBar>
          )}
          <Button
            color="inherit"
            sx={{ margin: "10px" }}
            onClick={() => setIsOpen(true)}
          >
            <img src="src/assets/iconCart.svg" />
            <StyledDivForTabletInCartIcon>
              {" "}
              {cartQuantity}{" "}
            </StyledDivForTabletInCartIcon>
          </Button>
          <DrawerCart
            openCart={isOpen}
            closeCart={handleCloseCart}
            key={Math.random()}
          />
        </Toolbar>
      </AppBar>
    </StyledBoxForNavBar>
  );
}
