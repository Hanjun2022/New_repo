import React, { useState } from "react";
import axios from "axios";

const CommentListPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const handleFetchComments = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/posts/3/comments");

      if (response.data.resultCode === "200") {
        setComments(response.data.data);
      } else {
        console.error("Failed to fetch comments:", response.data.resultMessage);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    const commentData = {
      userNo: 3,
      commentContent: commentContent,
    };

    try {
      const response = await axios.post(
        "/api/posts/3/comments/save",
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.resultCode === "200") {
        console.log("Comment saved successfully:", response.data);
        // Fetch comments again to update the list
        handleFetchComments();
        // Clear the comment input field
        setCommentContent("");
      } else {
        console.error("Failed to save comment:", response.data.resultMessage);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <div>
      <h1>Comment List</h1>
      <button onClick={handleFetchComments} disabled={loading}>
        {loading ? "Loading..." : "Fetch Comments"}
      </button>
      <form onSubmit={handleSubmitComment}>
        <div>
          <label>Comment:</label>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Comment</button>
      </form>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>Nickname: {comment.nickName}</p>
              <p>Content: {comment.commentContent || "No content"}</p>
              <p>Modified Time: {comment.modifiedTime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default CommentListPage;
