import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StyledMenuItem = styled(MenuItem)({
  fontSize: "1.5rem",
  paddingRight: "2rem",
  color: "black",
  textDecoration: "none",
});

export default function PositionedMenu({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setOpenModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    handleClose();
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IconButton>
          <AccountCircleRoundedIcon
            fontSize="large"
            sx={{
              color: "white",
              marginRight: ".8rem",
              display: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </IconButton>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            zIndex: 1200,
          },
        }}
      >
        {!isAuthenticated && (
          <div>
            <StyledMenuItem onClick={handleClose}>
              <Link
                to={`/login`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </StyledMenuItem>
            <StyledMenuItem onClick={handleClose}>
              <Link
                to={`/signup`}
                style={{ color: "black", textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </StyledMenuItem>
          </div>
        )}
        {isAuthenticated && (
          <div>
            <StyledMenuItem onClick={handleClose}>
              <Link
                to={`/profile`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Profile
              </Link>
            </StyledMenuItem>
            <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
          </div>
        )}
      </Menu>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            <strong>Are you sure you want to logout?</strong>
            <br />
            If you log out you won't be able to add any more items to your cart
            and the items currently in your cart will be lost.{" "}
          </Typography>
          <Button
            variant="contained"
            sx={{ background: "red", margin: ".8rem .5rem" }}
            onClick={handleConfirmLogout}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            sx={{ background: "blue", margin: ".8rem .5rem" }}
            onClick={() => setOpenModal(false)}
          >
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
