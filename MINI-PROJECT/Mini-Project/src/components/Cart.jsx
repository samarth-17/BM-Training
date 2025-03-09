import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import {
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Cart = ({ userId }) => {
  const { cart, totalPrice, fetchCart, addToCart, removeFromCart, deleteCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart(userId);
  }, [userId, fetchCart]);

  return (
    <Card sx={{ width: 400, margin: "auto", mt: 4, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Your Cart
        </Typography>

        <List>
          {cart.length > 0 ? (
            cart.map((item) => (
              <ListItem key={item.id} sx={{ mb: 1 }}>
                <ListItemText primary={`${item.title} - ${item.quantity} x $${item.price}`} />
                <Button variant="outlined" color="error" size="small" onClick={() => removeFromCart(item.id, userId)}>
                  Remove
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography color="textSecondary" textAlign="center">
              Your cart is empty.
            </Typography>
          )}
        </List>

        <Typography variant="h6" sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}>
          Total: ${totalPrice}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%" }}
          onClick={() => {
            addToCart(userId, [{ id: 144, quantity: 1 }]);
            navigate("/products");
          }}
        >
          Add Products
        </Button>

        <Button variant="contained" color="error" sx={{ mt: 1, width: "100%" }} onClick={() => deleteCart(userId)}>
          Delete Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default Cart;
