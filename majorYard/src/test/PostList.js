import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/posts/list", {
        page: 1,
        size: 3,
        sort: "DESC",
      });

      if (response.data.resultCode === "200") {
        setPosts(response.data.data.content);
      } else {
        console.error("Failed to fetch posts:", response.data.resultMessage);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div>
                <strong>{post.postTitle}</strong>
              </div>
              <div>{post.postContent}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
