import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore"; 
import { 
  Container, Typography, Card, CardContent, TextField, Button, CircularProgress, Paper, Divider 
} from "@mui/material";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuthStore(); 
  const userId = user?.id; 

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://dummyjson.com/posts/${id}/comments`);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!userId) {
      alert("You need to be logged in to comment.");
      return;
    }

    if (newComment.trim()) {
      try {
        const response = await axios.post("https://dummyjson.com/comments/add", {
          body: newComment,
          postId: Number(id),
          userId: Number(userId), 
        });

        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {post ? (
        <>
          <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
          </Card>

          <Paper sx={{ p: 3, boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              💬 Comments
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {loading ? (
              <CircularProgress />
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <Card key={comment.id} sx={{ mb: 2, p: 2, boxShadow: 1 }}>
                  <Typography variant="body1">{comment.body}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    - User {comment.user?.id || "Anonymous"}
                  </Typography>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet
              </Typography>
            )}

            {userId ? (
              <>
                <TextField
                  label="Write a comment..."
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Button 
                  onClick={handleAddComment} 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                >
                  Add Comment
                </Button>
              </>
            ) : (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                You must be logged in to comment.
              </Typography>
            )}
          </Paper>
        </>
      ) : (
        <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Container>
      )}
    </Container>
  );
};

export default PostDetails;
