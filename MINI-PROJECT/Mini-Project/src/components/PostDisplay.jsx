import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Card, CardContent, Typography, Button, Pagination } from "@mui/material";

const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; 
  useEffect(() => {
    axios.get("https://dummyjson.com/posts").then((response) => {
      setPosts(response.data.posts);
    });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📢 Posts
      </Typography>

      {currentPosts.map((post) => (
        <Card key={post.id} sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body}
            </Typography>
            <Link to={`/posts/${post.id}`} className="text-indigo-500 mt-2 inline-block font-semibold">
            Read More →
          </Link>
          </CardContent>
        </Card>
      ))}

      <Pagination
        count={Math.ceil(posts.length / postsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
      />
    </Container>
  );
};

export default PostDisplay;
