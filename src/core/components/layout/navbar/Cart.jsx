import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Link to="/cart">
      <IconButton aria-label="cart">
        <StyledBadge
          badgeContent={cartItems.length}
          color="primary"
          className="m-0 p-0 text-3xl md:text-5xl"
        >
          <ShoppingCartIcon fontSize="inherit" className="text-fuchsia-900" />
        </StyledBadge>
      </IconButton>
    </Link>
  );
}
