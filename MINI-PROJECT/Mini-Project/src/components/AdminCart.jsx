import React, { useEffect, useState } from "react";
import useCartStore from "../store/useCartStore";
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { toast } from "react-hot-toast";

const AdminCart = () => {
  const { allCarts, fetchAllCarts, addToUserCart, updateCart, removeCart } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState({ id: 144, quantity: 1 });

  useEffect(() => {
    fetchAllCarts();
  }, []);

  const handleAddProduct = async (userId) => {
    const loadingToast = toast.loading("Adding product...");
    try {
      await addToUserCart(userId, [selectedProduct]);
      toast.success("Product added successfully!", { id: loadingToast });
      fetchAllCarts();
    } catch (error) {
      toast.error("Failed to add product!", { id: loadingToast });
    }
  };

  const handleRemoveCart = async (cartId) => {
    const loadingToast = toast.loading("Removing cart...");
    try {
      await removeCart(cartId);
      toast.success("Cart removed successfully!", { id: loadingToast });
      fetchAllCarts();
    } catch (error) {
      toast.error("Failed to remove cart!", { id: loadingToast });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
        Admin Cart Management
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>User ID</b></TableCell>
              <TableCell><b>Products</b></TableCell>
              <TableCell><b>Total Price</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCarts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>{cart.userId}</TableCell>
                <TableCell>
                  {cart.products.map((product) => (
                    <div key={product.id}>
                      {product.title} - {product.quantity} x ${product.price}
                    </div>
                  ))}
                </TableCell>
                <TableCell>${cart.total}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleAddProduct(cart.userId)}
                  >
                    Add Product
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleRemoveCart(cart.id)}
                  >
                    Remove Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminCart;
