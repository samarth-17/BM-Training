import { useState } from 'react';


function GetAllPosts({setPosts}){
    const[loading , setLoading]=useState(false);

    const fetchAllPosts = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            setPosts(json);
          })
          .catch((error) => console.error("Error fetching data:", error))
          .finally(()=>setLoading(false));
      };

    return (
        <div>
        <button onClick={fetchAllPosts} style={{marginTop :"5%"}}>Get All</button>
        {loading && <p>Loading...</p>}
      </div>
    );
  }

  export default GetAllPosts;