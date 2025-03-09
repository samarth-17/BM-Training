import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/api/UserApi";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, Avatar, Typography, CircularProgress, Box } from "@mui/material";

export function UserDetails() {
  const { id } = useParams();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" align="center">Error: {error.message}</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            src={user.image}
            alt={user.username}
            sx={{ width: 80, height: 80, mx: "auto" }}
          />
        }
        title={
          <Typography variant="h6" align="center">
            {user.firstName} {user.lastName}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textSecondary" align="center">
            @{user.username}
          </Typography>
        }
      />
      <CardContent>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Gender:</strong> {user.gender}</Typography>
        <Typography><strong>Phone:</strong> {user.phone}</Typography>
        <Typography><strong>Birth Date:</strong> {user.birthDate}</Typography>
      </CardContent>
    </Card>
  );
}
