import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useShoppingCart } from "../context/ShoppingCartContext";
import UserContext from "../context/UserContext";
import { Pages } from "../utils/route.utils";
import { DrawerCart } from "./DrawerCart.component";
import PositionedMenu from "./MenuUser.component";

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

const StyledStackContentWebSocket = styled(Stack)({
  padding: "8px",
  display: "flex",
  justifyContent: "end",
  alignItems: "end",
  background: "red",
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

    const {requestCount, isConnected} = useCounterRequestSocket();

  // TRANSFORMER EN CUSTOM HOOK
  // const [requestCount, setRequestCount] = useState(0);
  // const [isConnected, setIsConnected] = useState(false);

  // useEffect(() => {
  //   const socket = io("ws://localhost:3000/");
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });
  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });
  //   socket.on("counterRequest", (requestData: number) => {
  //     setRequestCount(requestData);
  //   });
  //   return () => {
  //     socket.off("connect");
  //     socket.off("counterRequest");
  //     socket.off("disconnect");
  //     socket.disconnect();
  //   };
  // }, []);

  const [requestCount, setRequestCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io("ws://localhost:3000/");
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("counterRequest", (requestData: number) => {
      setRequestCount(requestData);
    });
    return () => {
      socket.off("connect");
      socket.off("counterRequest");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    if (user?.role === "ADMIN") setIsAdmin(true);
    else setIsAdmin(false);
  }, [user]);

  //! callBack pour eviter de la recréer a chaque rendu
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
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ background: "black" }}>
          <PositionedMenu isAuthenticated={isAuthenticated} />
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={Pages.HOME} id="navigate_to_home">
              Home
            </StyledForLinkInNav>
          </StyledTypographyForNavBar>
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={Pages.HOME} id="navigate_to_store">
              Store
            </StyledForLinkInNav>
          </StyledTypographyForNavBar>
          <StyledTypographyForNavBar variant="h6">
            <StyledForLinkInNav to={Pages.NEWS} id="navigate_to_news">
              News
            </StyledForLinkInNav>
          </StyledTypographyForNavBar>
          {isAdmin && (
            <StyledTypographyForNavBar variant="h6">
              <StyledForLinkInNav to={Pages.ADD_NEWS} id="navigate_to_add_news">
                Add News
              </StyledForLinkInNav>
            </StyledTypographyForNavBar>
          )}
          <Button
            id="cart_btn"
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
        <StyledStackContentWebSocket
          direction="column"
          style={{
            padding: "8px",
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            background: "red",
            color: "white",
          }}
        >
          <p>Number of requests in last hour: {requestCount}</p>
          {isConnected ? (
            <p>WebSocket Status: Connected</p>
          ) : (
            <p>WebSocket Status: Disconnected</p>
          )}
        </StyledStackContentWebSocket>
      </AppBar>
    </StyledBoxForNavBar>
  );
}
