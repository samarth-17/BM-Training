
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box, Alert, CircularProgress } from "@mui/material";
import { loginUser } from "../api/authApi"; 
import useAuthStore from "../store/useAuthStore"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, user } = useAuthStore(); // Zustand store
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const { user, token, refreshToken } = await loginUser(formData);
      login({ user, token, refreshToken });
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
