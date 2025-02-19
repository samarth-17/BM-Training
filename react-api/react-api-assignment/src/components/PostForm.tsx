import { useState } from 'react';
import '../App.css'
function PostForm(){

    const[postData , setPostData]=useState({
    title :"",
    body : "",
    userId : "",
  });

  const postDataHandle = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const submitButton = async (e) => {
    e.preventDefault();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    console.log(data);
  };


  return(
    <form onSubmit={submitButton}>
      <input type="text" placeholder='Enter Title' name="title" value={postData.title} onChange={postDataHandle}  style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}></input>
      <input type="text" placeholder='Enter Body' name="body" value={postData.body} onChange={postDataHandle}  style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}></input>
      <input type="number" placeholder='Enter Id' name="userId" value={postData.userId} onChange={postDataHandle} style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}></input>
      <button type="submit">Post</button>
      </form>
  );
}

export default PostForm;