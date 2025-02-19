import { useState } from 'react';


function GetPostById() {
    const [postId, setPostId] = useState("");
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null)

    const fetchId = async () => {
        if (!postId) return;
        setLoading(true);

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!res.ok) {
                throw new Error("Post not found");
            }
            const data = await res.json();
            setPost(data);
        } catch (error) {
            console.log("Error:", error);
            setPost(null); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div  style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
            <input
                type="number"
                placeholder="Enter a post ID"
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
            />
            <button onClick={fetchId}>Fetch Post</button>

            {loading && <p>Loading...</p>}

            {post && (
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            )}
        </div>
    );
}

export default GetPostById;
