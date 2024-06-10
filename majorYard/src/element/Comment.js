import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Comment.css";
import { useParams, useNavigate } from "react-router-dom";

const Comment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editingReply, setEditingReply] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, [id]);

  // useEffect(() => {
  //   fetchComments();
  // }, [id]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const url = `http://54.180.150.195:8080/posts/${id}/comments`;
      const response = await axios.get(url);
      if (response.data.resultCode === "200") {
        const commentsWithReplies = await Promise.all(
          response.data.data.map(async (comment) => {
            const replies = await fetchReplies(comment.id);
            return { ...comment, replies };
          })
        );
        setComments(commentsWithReplies);
      } else {
        setError("Failed to fetch comments: " + response.data.resultMessage);
      }
    } catch (error) {
      setError("Failed to fetch comments: " + error.message);
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async (commentId) => {
    try {
      const url = `http://54.180.150.195:8080/posts/${id}/comments/${commentId}`;
      const response = await axios.get(url);
      if (response.data.resultCode === "200") {
        return response.data.data;
      } else {
        setError("Failed to fetch replies: " + response.data.resultMessage);
        return [];
      }
    } catch (error) {
      setError("Failed to fetch replies: " + error.message);
      console.error("Error fetching replies:", error);
      return [];
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (commentId) => {
    try {
      const newReply = {
        userNo: 1, // 사용자 번호
        commentContent: replyContent,
      };
      const url = `http://54.180.150.195:8080/posts/${id}/comments/${commentId}/save`;
      const response = await axios.post(url, newReply);
      if (response.data.resultCode === "200") {
        navigate(`/post/list/${id}`);
      } else {
        setError("Failed to submit reply: " + response.data.resultMessage);
      }
    } catch (error) {
      setError("Failed to submit reply: " + error.message);
      console.error("Error submitting reply:", error);
    }
    setReplyingTo(null);
    setReplyContent("");
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const newComment = {
        userNo: 1, // 사용자 번호
        commentContent: commentContent,
      };
      const url = `http://54.180.150.195:8080/posts/${id}/comments/save`;
      const response = await axios.post(url, newComment);
      if (response.data.resultCode === "200") {
        const updatedComments = [...comments, response.data.data];
        setComments(updatedComments);
        setError(null);
      } else {
        setError("Failed to submit comment: " + response.data.resultMessage);
      }
    } catch (error) {
      setError("Failed to submit comment: " + error.message);
      console.error("Error submitting comment:", error);
    }
    setCommentContent("");
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const deleteUrl = `http://54.180.150.195:8080/posts/${id}/comments/${commentId}`;
      await axios.delete(deleteUrl);
      const newComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(newComments);
    } catch (error) {
      setError("Failed to delete comment: " + error.message);
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      const deleteUrl = `http://54.180.150.195:8080/posts/${id}/comments/${replyId}`;
      await axios.delete(deleteUrl);
      const updatedComments = comments.map((comment) => ({
        ...comment,
        replies: comment.replies.filter((reply) => reply.id !== replyId),
      }));
      setComments(updatedComments);
    } catch (error) {
      setError("Failed to delete reply: " + error.message);
      console.error("Error deleting reply:", error);
    }
  };

  const handleEditClick = (commentId, isReply, replyId) => {
    if (isReply) {
      const reply = comments
        .find((comment) => comment.id === commentId)
        .replies.find((reply) => reply.id === replyId);
      setEditingReply({ commentId, replyId });
      setReplyContent(reply.commentContent);
    } else {
      const comment = comments.find((comment) => comment.id === commentId);
      setEditingComment(commentId);
      setCommentContent(comment.commentContent);
    }
  };

  const handleEditChange = (e, isReply) => {
    if (isReply) {
      setReplyContent(e.target.value);
    } else {
      setCommentContent(e.target.value);
    }
  };
  const showEditSuccessAlert = () => {
    alert("댓글이 성공적으로 수정되었습니다.");
  };
  const handleEditSubmit = async (commentId) => {
    try {
      const updatedComment = {
        commentContent: commentContent,
      };
      const url = `http://54.180.150.195:8080/posts/${id}/comments/${commentId}`;
      const response = await axios.put(url, updatedComment);
      if (response.data.resultCode === "200") {
        // 댓글 수정이 성공한 경우
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              commentContent: commentContent,
            };
          }
          return comment;
        });
        setComments(updatedComments);
        setEditingComment(null);
        setCommentContent("");
        showEditSuccessAlert(); // 수정 완료 알림 표시
      } else {
        setError("Failed to submit edit: " + response.data.resultMessage);
      }
    } catch (error) {
      setError("Failed to submit edit: " + error.message);
      console.error("Error submitting edit:", error);
    }
  };

  return (
    <div>
      <div className="comment-title">댓글</div>
      <div className="comment-form">
        <textarea
          className="comment-textarea"
          value={commentContent}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요"
        />
        <button className="comment-submit-button" onClick={handleCommentSubmit}>
          작성
        </button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="comment-header">
            <span className="comment-nickname">{comment.nickName}</span>
          </div>
          <div className="comment-content">
            {editingComment === comment.id ? (
              <textarea
                className="edit-comment-textarea"
                value={commentContent}
                onChange={(e) => handleEditChange(e, false)}
              />
            ) : (
              comment.commentContent
            )}
          </div>
          <div className="comment-details">
            <span className="comment-date">{comment.modifiedTime}</span>
          </div>
          <div className="comment-bottom">
            <div className="comment-buttons">
              <button
                className="comment-button-reply-button"
                onClick={() => handleReplyClick(comment.id)}
              >
                답글쓰기
              </button>

              <button
                className="comment-button-edit-button"
                onClick={() => handleEditClick(comment.id, false)}
              >
                수정
              </button>
              <button
                className="comment-button-delete-button"
                onClick={() => handleDeleteComment(comment.id)}
              >
                삭제
              </button>
            </div>
            {editingComment === comment.id && (
              <button
                className="comment-button-submit-edit-button"
                onClick={() => handleEditSubmit(comment.id)}
              >
                저장
              </button>
            )}
          </div>
          {replyingTo === comment.id && (
            <div className="reply-form">
              <textarea
                className="reply-textarea"
                value={replyContent}
                onChange={handleReplyChange}
                placeholder="댓글을 입력하세요"
              />
              <button
                className="comment-button submit-reply-button"
                onClick={() => handleReplySubmit(comment.id)}
              >
                등록
              </button>
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="replies">
              {comment.replies.map((reply) => (
                <div className="comment-reply" key={reply.id}>
                  <div className="comment-header">
                    <span className="comment-nickname">{reply.nickName}</span>
                  </div>
                  <div className="comment-content">
                    {editingReply &&
                    editingReply.commentId === comment.id &&
                    editingReply.replyId === reply.id ? (
                      <textarea
                        className="edit-reply-textarea"
                        value={replyContent}
                        onChange={(e) => handleEditChange(e, true)}
                      />
                    ) : (
                      reply.commentContent
                    )}
                  </div>
                  <div className="comment-details">
                    <span className="comment-date">{reply.modifiedTime}</span>
                  </div>
                  <div className="comment-buttons">
                    <button
                      className="comment-button-edit-button"
                      onClick={() =>
                        handleEditClick(comment.id, true, reply.id)
                      }
                    >
                      수정
                    </button>
                    <button
                      className="comment-button-delete-button"
                      onClick={() => handleDeleteReply(reply.id)}
                    >
                      삭제
                    </button>
                    {editingComment === comment.id && (
                      <button
                        className="comment-button-submit-edit-button"
                        onClick={() => handleEditSubmit(comment.id)}
                      >
                        저장
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
