import React, { useState, useEffect } from "react";
import "./FreeBoardContents.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const FreeBoardContents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  let BoardNumber = localStorage.getItem("BoardNum");

  useEffect(() => {
    fetchPosts();
  }, []);

  const url = `http://54.180.150.195:8080/posts/free/list/${BoardNumber}`;
  const params = {
    page: 1,
    size: 10,
    sort: "DESC",
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, { params });
      setPosts(response.data.data.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const FreeCard = ({
    title,
    content,
    date,
    likes,
    scraps,
    comments,
    image,
    id,
  }) => {
    return (
      <Link
        to={`/posts/list/${id}`}
        className="detail-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {" "}
        <div className="FreeCard-div">
          <div className="FreeCard">
            <h2 className="FreeCard-title">{title}</h2>
            <div className="FreeCard-content">{content}</div>
            <div className="card-details">
              <p className="card-date">{date}</p>
              <p className="card-likes">
                <FontAwesomeIcon icon={faHeart} className="icon" /> {likes}
              </p>
              <p className="card-scraps">
                <FontAwesomeIcon icon={faBookmark} className="icon" /> {scraps}
              </p>
              <p className="card-comments">
                <FontAwesomeIcon icon={faComment} className="icon" /> {comments}
              </p>
            </div>
          </div>
          {image && <img src={image} alt="Card" className="FreeCard-image" />}
        </div>
      </Link>
    );
  };

  const handleSearch = () => {
    const results = posts.filter((post) =>
      post.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const displayData = searchResults.length > 0 ? searchResults : posts;

  return (
    <div className="freeboard">
      <div className="head-contents">
        <h2>자유게시판</h2>
        <div className="input">
          <input
            type="text"
            placeholder="게시물 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>
      <div className="freeboard-contents">
        {loading ? (
          <p>Loading...</p>
        ) : (
          displayData.map((post) => (
            <div key={post.id}>
              <FreeCard
                id={post.id}
                title={post.postTitle}
                content={post.postContent}
                date={post.modifiedTime}
                likes={post.postLike}
                scraps={post.postScrab}
                comments={post.postcomment}
                image={
                  post.imgUrls && post.imgUrls.length > 0
                    ? post.imgUrls[0]
                    : null
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FreeBoardContents;
