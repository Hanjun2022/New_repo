import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./StudyPostDetail.css";

const StudyPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://54.180.150.195:8080/posts/study/list/${id}/detail`
        );
        setPost(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("게시물을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://54.180.150.195:8080/posts/list/${id}`);
      alert("게시물이 성공적으로 삭제되었습니다.");
      navigate("/studyboard");
    } catch (err) {
      setError("게시물을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="detail-page">
      {post ? (
        <div className="post">
          <h2 className="post-title">{post.postTitle}</h2>
          <p className="writer">작성자: {post.nickName}</p>
          {post.imgUrls &&
            post.imgUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Post"
                className="post-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/path/to/default-image.jpg";
                }}
              />
            ))}
          <p className="post-content">{post.postContent}</p>
          <div className="study-post-details">
            <div className="post-details-up">
              <p>모집인원 {post.studyPartyOf}</p>
              <p>모집기한 {post.studyUntil}</p>
              <p>장소 {post.studyRegion}</p>
            </div>
            <div className="post-details-bottom">
              <p>좋아요 {post.postLike}</p>
              <p>스크랩 {post.postScrab}</p>
              <p>댓글 {post.postcomment}</p>
              <p>작성 시간 {post.modifiedTime}</p>
            </div>
          </div>
          <button onClick={handleDelete} className="delete-button">
            삭제
          </button>
          <button onClick={handleEdit} className="edit-button">
            수정
          </button>
        </div>
      ) : (
        <p>존재하지 않는 게시물입니다.</p>
      )}
    </div>
  );
};

export default StudyPostDetail;
