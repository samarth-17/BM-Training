import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useCommentStore from "../store/useCommentStore";
import { 
  Container, Typography, Card, CardContent, TextField, Button, CircularProgress, Paper, Divider 
} from "@mui/material";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { comments, fetchComments, addComment } = useCommentStore();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}`).then((response) => {
      setPost(response.data);
    });

    fetchComments();
  }, [id, fetchComments]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(id, newComment, "Guest User");
      setNewComment("");
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
            
            {comments
              .filter((comment) => comment.postId === parseInt(id))
              .map((comment) => (
                <Card key={comment.id} sx={{ mb: 2, p: 2, boxShadow: 1 }}>
                  <Typography variant="body1">{comment.body}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    - {comment.user}
                  </Typography>
                </Card>
              ))}

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
