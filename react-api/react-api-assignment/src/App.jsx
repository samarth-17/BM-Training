import { useState } from "react";
import GetAllPosts from "./components/GetAllPosts"
import PostForm from "./components/PostForm"
import "./App.css";
import GetPostById from "./components/GetPostById";

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <h1>React API Assignment</h1>


      <PostForm />

      <GetAllPosts setPosts={setPosts} />

      <GetPostById/>       
   

      
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
