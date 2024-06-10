import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "./StudyBoardContents.css";

const StudyBoardContents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const BoardNumber = localStorage.getItem("BoardNum")

  useEffect(() => {
    fetchPosts();
  }, []);

  const url = `http://54.180.150.195:8080/posts/study/list/${parseInt(BoardNumber)+4}`;
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

  useEffect(() => {
    
  }, []);

  const StudyCard = ({
    title,
    content,
    date,
    likes,
    scraps,
    comments,
    image,
    studyDate,
    studyLocation,
    studyMember,
  }) => {
    return (
      <div className="StudyCard-div">
        <div className="StudyCard">
          <h2 className="StudyCard-title">{title}</h2>
          <div className="StudyCard-info-div">
            <p>모집인원: {studyMember} </p>
            <p>모집기한: {studyDate} </p>
            <p>장소: {studyLocation}</p>
          </div>
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
        {image && <img src={image} alt="Card" className="StudyCard-image" />}
      </div>
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
    <div className="studyboard">
      <div className="head-contents">
        <h2>스터디게시판</h2>
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
      <div className="studyboard-contents">
        {loading ? (
          <p>Loading...</p>
        ) : (
          displayData.map((post) => (
            <Link
              to={`/posts/study/list/${post.id}/detail`} // Correctly set the Link URL
              className="detail-link"
              style={{ textDecoration: "none", color: "inherit" }}
              key={post.id} // Include key prop to avoid warnings
            >
              <StudyCard
                image={
                  post.imgUrls && post.imgUrls.length > 0
                    ? post.imgUrls[0]
                    : null
                }
                title={post.postTitle}
                content={
                  post.postContent.length < 230
                    ? post.postContent
                    : post.postContent.slice(0, 230) + "..."
                }
                date={post.modifiedTime}
                likes={post.postLike}
                scraps={post.postScrab}
                comments={post.postcomment}
                studyDate={post.studyUntil}
                studyMember={post.studyPartyOf}
                studyLocation={post.studyRegion}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyBoardContents;
