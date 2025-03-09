import axios from "axios";

export const fetchComments = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/comments");
    return response.data.comments || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const addComment = async (postId, body, userName) => {
  try {
    const response = await axios.post("https://dummyjson.com/comments/add", {
      body,
      postId,
      user: userName,
    });
    return response.data || null;
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
};
