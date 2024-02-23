import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledMenuItem = styled(MenuItem)({
  fontSize: "1.5rem",
  paddingRight: "2rem",
  color: "black", 
  textDecoration: "none"
});

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      </Menu>
    </div>
  );
}
