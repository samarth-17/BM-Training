import { create } from "zustand";
import { fetchComments, addComment } from "../api/CommentApi";

const useCommentStore = create((set, get) => ({
  comments: [],

  fetchComments: async () => {
    const comments = await fetchComments();
    set({ comments });
  },

  addComment: async (postId, body, userName) => {
    const newComment = await addComment(postId, body, userName);
    if (newComment) {
      set({ comments: [...get().comments, newComment] });
    }
  },
}));

export default useCommentStore;
