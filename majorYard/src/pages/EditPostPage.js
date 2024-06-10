import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HeaderSidebarSet from "../component/HeaderSidebar/HeaderSidebarSet";
import "./EditPostPage.css";
const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://54.180.150.195:8080/posts/list/${id}`
        );
        setPostTitle(response.data.data.postTitle);
        setPostContent(response.data.data.postContent);
        setLoading(false);
      } catch (err) {
        setError("게시물을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://54.180.150.195:8080/posts/list/${id}`, {
        postTitle,
        postContent,
      });
      alert("게시물이 성공적으로 수정되었습니다.");
      navigate(`/posts/list/${id}`);
    } catch (err) {
      setError("게시물을 수정하는 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <HeaderSidebarSet />
      <div className="edit-page">
        <h2>수정하기</h2>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleSave} className="edit-save-button">
          저장
        </button>
      </div>
    </div>
  );
};

export default EditPostPage;
