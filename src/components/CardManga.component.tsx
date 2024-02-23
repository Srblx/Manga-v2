import {
  Button,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { MangaModelData } from "../interfaces/MangaModelInterface";
import {
  StyledLinkForReadMoreInfo,
  StyledMangaCard,
  StyledMangaCardContent,
  StyledSpanPrice,
  StyledStackContentBtnReadMore,
  StyledStackForAddToCart,
  StyledTypographyForInfoMangaInCard,
} from "./StyledBaliseMui/StyledForCardManga";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { formatCurrency } from "../utils/FormatCurrency";

type MangaItemsProps = {
  manga: MangaModelData;
  price: number;
  isAuthenticated: boolean
};

export function MangaCard({ manga, price, isAuthenticated }: MangaItemsProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFormCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(manga.mal_id);

  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    increaseCartQuantity(manga.mal_id);
  };

  return (
    <StyledMangaCard>
      <StyledMangaCardContent>
        <StyledTypographyForInfoMangaInCard>
          {manga.title}
        </StyledTypographyForInfoMangaInCard>
        <CardMedia
          component="img"
          height="150"
          image={manga.images.jpg.image_url}
          alt="Manga cover"
        />
        <StyledTypographyForInfoMangaInCard>
          {manga.synopsis}
        </StyledTypographyForInfoMangaInCard>
        <StyledStackContentBtnReadMore>
          <StyledLinkForReadMoreInfo
            style={{ color: "green" }}
            to={`/${manga.mal_id}`}
          >
            Read more...
          </StyledLinkForReadMoreInfo>
          {manga.authors[0] && (
            <Typography sx={{ margin: "auto" }}>
              {manga.authors[0].name}
            </Typography>
          )}
          <StyledStackForAddToCart direction="row" spacing={3}>
          {isAuthenticated ? (
              <>
              {quantity === 0 ? (
              <Button
                onClick={handleAddToCartClick}
                startIcon={<AddShoppingCartIcon />}
                size="small"
                sx={{ fontWeight: "bold" }}
              >
                Add to cart
              </Button>
            ) : (
              <Stack direction={"row"} spacing={2}>
                {quantity === 1 ? (
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => removeFormCart(manga.mal_id)}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="remove"
                    size="small"
                    onClick={() => decreaseCartQuantity(manga.mal_id)}
                  >
                    <RemoveIcon fontSize="small" style={{ color: "red" }} />
                  </IconButton>
                )}
                <Stack sx={{ margin: "10px", justifyContent: "center"}}>
                  <p>
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {quantity}
                    </span>{" "}
                    in cart
                  </p>
                </Stack>
                <IconButton
                  aria-label="add"
                  size="small"
                  onClick={() => increaseCartQuantity(manga.mal_id)}
                >
                  <AddIcon fontSize="small" style={{ color: "green" }} />
                </IconButton>
                {quantity > 1 && (
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => removeFormCart(manga.mal_id)}
                  >
                    <DeleteIcon fontSize="small" style={{ color: "red" }} />
                  </IconButton>
                )}
              </Stack>
            )}
            </>
            ) : (
              <Typography variant="body2" color="error" sx={{fontWeight: "bold"}}>
                Please log in to add to cart
              </Typography>
            )}
            <StyledSpanPrice>{formatCurrency(price)}</StyledSpanPrice>
          </StyledStackForAddToCart>
        </StyledStackContentBtnReadMore>
      </StyledMangaCardContent>
    </StyledMangaCard>
  );
}
