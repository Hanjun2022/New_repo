import React, { useState } from "react";
import axios from "axios";
import "./WritePostPage.css";
import HeaderSidebarSet from "../component/HeaderSidebar/HeaderSidebarSet";

const PostForm = () => {
  const [board, setBoard] = useState("자유게시판"); //일단 기본은 자게
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("imgList", file);
    formData.append(
      "posting",
      new Blob(
        [
          JSON.stringify({
            postTitle: title,
            postContent: content,
            userNo: 1, // 사용자 번호 (나중에 바꿔야 됨)
            boardNo: 1, // 자유게시판 번호 (자게 선택하는 거에 따라 달라지게 해야 됨)
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    try {
      await axios.post("http://54.180.150.195:8080/posts/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("게시물이 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error("게시물 등록 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div>
      <HeaderSidebarSet />
      <form className="page-container" onSubmit={handleSubmit}>
        <div>
          <label>게시판 선택:</label>
          <select
            className="select-board"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
          >
            <option value="자유게시판">자유게시판</option>
            <option value="홍보게시판">홍보게시판</option>
            <option value="질문게시판">질문게시판</option>
            <option value="스터디게시판">스터디게시판</option>
          </select>
        </div>
        <div>
          <label>제목:</label>
          <input
            className="input-field"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>파일 첨부:</label>
          <input
            className="input-file"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            className="textarea-field"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="button-container">
          <button className="submit-button" type="submit">
            발행
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
