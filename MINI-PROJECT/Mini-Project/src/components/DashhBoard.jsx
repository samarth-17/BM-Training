import React, { useEffect } from "react";
import useDashboardStore from "../store/useDashboardStore";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  // Button,
  Container,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";

const DashhBoard = () => {
  const { quotes, recipes, fetchQuotes, fetchRecipes } = useDashboardStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
    fetchRecipes();
  }, [fetchQuotes, fetchRecipes]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Card
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            Welcome, {user?.username}!
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>Email: {user?.email}</Typography>
          <Button onClick={handleLogout} variant="destructive">Logout
          </Button>
        </CardContent>
      </Card>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#333", mb: 2 }}>
        Motivational Quotes
      </Typography>
      {quotes.length === 0 ? (
        <CircularProgress />
      ) : (
        quotes.slice(0, 3).map((quote) => (
          <Card
            key={quote.id}
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: "#fafafa",
              borderLeft: "6px solid #FF9800",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontStyle="italic">
                "{quote.quote}"
              </Typography>
              <Typography align="right" fontWeight="bold" sx={{ mt: 1 }}>
                - {quote.author}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#333", mt: 4, mb: 2 }}>
        Recipes
      </Typography>
      {recipes.length === 0 ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>  
          {recipes.slice(0, 3).map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia component="img" height="180" image={recipe.image} alt={recipe.name} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {recipe.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                   <Button>View Recipe</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DashhBoard;
