import { useCallback, useEffect, useState } from "react";
import {
  StyledBoxForNavBar,
  StyledDivForTabletInCartIcon,
  StyledForLinkInNav,
  StyledTypographyForNavBar,
} from "./StyledBaliseMui/StyledForNavBarMui";
import {
  AppBar,
  Button,
  Toolbar,
} from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { DrawerCart } from "./DrawerCart.component";
import PositionedMenu from "./LoginSignUp/MenuUser.component";

export default function NavBar() {
  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.pageYOffset
  );
  const [visible, setVisible] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const { cartQuantity } = useShoppingCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); 

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
          {/* <Typography> */}
          <PositionedMenu isAuthenticated={isAuthenticated} />
          {/* </Typography> */}
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={`/`}>Home</StyledForLinkInNav>
          </StyledTypographyForNavBar>
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={`/`}>Store</StyledForLinkInNav>
          </StyledTypographyForNavBar>
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={`about`}>About</StyledForLinkInNav>
          </StyledTypographyForNavBar>
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
