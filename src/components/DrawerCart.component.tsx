import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Stack, styled } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { MangaModelData } from "../interfaces/MangaModel.interface";
import { formatCurrency } from "../utils/FormatCurrency.utils";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_BASE_MANGA } from "../utils/routeApi.utils";

const StyledParagrapheContentTotalCart = styled("p")({
  color: "white",
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "2rem",
});

const StyledStackForCardContentItemInCart = styled(Stack)({
  background: " #f4e2e2",
  padding: ".2rem",
  borderRadius: "10px",
  alignItems: "center",
});

const StyledIconBtnCloseCart = styled(IconButton)({
  color: "white",
  background: "red",
  width: "100%",
  borderRadius: "0px 0px 10px 10px",
  padding: "65px 0px 5px 0px",
});

const StyledIconButton = styled(IconButton)({
  alignItems: "flex-start",
  background: "black",
  border: "2px solid white",
  borderRadius: "10px",
  width: "100%",
  "&:hover": {
    background: "rgb(39, 39, 39);",
  },
});

type ShoppingCartProps = {
  openCart: boolean;
  closeCart: () => void;
};

export function DrawerCart({
  openCart,
  closeCart,
}: Readonly<ShoppingCartProps>) {
  const {
    ItemsInCartClient,
    removeFormCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();
  const price = 19.98;
  let total = 0;
  let totalCart = 0;

  const fetchCartItemsInfo = async () => {
    try {
      const axiosRequests = ItemsInCartClient.map(async (item) => {
        const response = await axios.get(`${URL_BASE_MANGA + item.id}`);
        return response.data.data as MangaModelData;
      });

      const cartItemsInfoResponses = await Promise.all(axiosRequests);
      return cartItemsInfoResponses.filter(Boolean);
    } catch (error) {
      console.error("Error fetching cart items info:", error);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mangasItemsCart"],
    queryFn: fetchCartItemsInfo,
    //^ Temps de sauvegarde des date en cache || garbageCollector
    gcTime: Infinity,
  });

  const populatedMangas = data?.map((x) => {
    return {
      id: x.mal_id,
      manga: x,
      quantity: ItemsInCartClient.find((y) => y.id === x.mal_id)?.quantity ?? 0, //|| 0,
    };
  });

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Erreur lors du chargement des données : {error.message}</p>;
  }

  return (
    <Drawer
      anchor={"right"}
      open={openCart && ItemsInCartClient.length > 0}
      onClose={closeCart}
      key={"cartDrawer"}
      sx={{
        width: "100%",
        "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
          backgroundColor: "rgb(39, 39, 39)",
        },
      }}
    >
      <Stack
        spacing={2}
        sx={{
          padding: "1rem",
          background: "rgb(39,39,39)",
        }}
      >
        <StyledIconBtnCloseCart
          id="close_cart_btn"
          sx={{
            color: "white",
            background: "red",
            width: "100%",
            borderRadius: "0px 0px 10px 10px",
            padding: "65px 0px 5px 0px",
          }}
          onClick={closeCart}
        >
          <CloseIcon />
        </StyledIconBtnCloseCart>
        <h1 style={{ color: "white", textAlign: "center" }}>CART</h1>
        {populatedMangas?.map((item) => {
          total = item.quantity * price;
          totalCart = item.quantity * price * populatedMangas.length;
          if (!item.manga) return null;
          return (
            <StyledStackForCardContentItemInCart
              direction="row"
              key={item.id}
              spacing={2}
            >
              <Stack sx={{ width: "100%" }}>
                <img
                  src={item.manga.images.jpg.image_url}
                  alt={item.manga.title}
                  style={{ width: "180px", height: "auto" }}
                />
              </Stack>
              <Stack
                direction="column"
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>Titre : {item.manga.title}</p>
                <p>Prix: {formatCurrency(price)}</p>
                <StyledIconButton
                  onClick={() => increaseCartQuantity(item.manga?.mal_id!)}
                  sx={{
                    "&:hover": {
                      "& .MuiSvgIcon-root": {
                        color: "green",
                      },
                    },
                  }}
                >
                  <AddIcon sx={{ color: "white" }} />
                </StyledIconButton>
                <p>{item.quantity}</p>
                <StyledIconButton
                  onClick={() => decreaseCartQuantity(item.manga?.mal_id!)}
                  sx={{
                    "&:hover": {
                      "& .MuiSvgIcon-root": {
                        color: "red",
                      },
                    },
                  }}
                >
                  {item.quantity === 1 ? (
                    <DeleteIcon sx={{ color: "red" }} />
                  ) : (
                    <RemoveIcon sx={{ color: "white" }} />
                  )}
                </StyledIconButton>
                <p>Total : {formatCurrency(total)}</p>
              </Stack>
              <IconButton
                onClick={() => removeFormCart(item.manga?.mal_id!)}
                sx={{
                  background: "red",
                  height: "100%",
                  borderRadius: "0 10px 10px 0",
                }}
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </StyledStackForCardContentItemInCart>
          );
        })}
      </Stack>
      <Stack sx={{ background: "rgb(39, 39, 39)" }}>
        <StyledParagrapheContentTotalCart>
          Total cart : {totalCart.toFixed(2)}
        </StyledParagrapheContentTotalCart>
      </Stack>
    </Drawer>
  );
}
