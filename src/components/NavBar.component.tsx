import { useCallback, useEffect, useState } from "react";
import { StyledBoxForNavBar, StyledDivForTabletInCartIcon, StyledTypographyForNavBar } from "./StyledBaliseMui/StyledForNavBarMui";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { DrawerCart } from "./DrawerCart.component";

export default function NavBar() {
  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.pageYOffset
  );
  const [visible, setVisible] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const { cartQuantity } = useShoppingCart();

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
  }

  return (
    <StyledBoxForNavBar sx={{...(visible ? { top: 0 } : { top: "-80px" })}}>
      <AppBar position="static" >
      <Toolbar sx={{background: "black"}}>
      <StyledTypographyForNavBar variant="h6" >
        Home
      </StyledTypographyForNavBar>
      <StyledTypographyForNavBar variant="h6">
        Store
      </StyledTypographyForNavBar>
      <StyledTypographyForNavBar variant="h6">
        About
      </StyledTypographyForNavBar>
      <Button
      color="inherit"
      sx={{ margin: "10px"}}
      onClick={() => setIsOpen(true)}
      >
        <img src="src/assets/iconCart.svg"/>
      <StyledDivForTabletInCartIcon> {cartQuantity} </StyledDivForTabletInCartIcon>
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
