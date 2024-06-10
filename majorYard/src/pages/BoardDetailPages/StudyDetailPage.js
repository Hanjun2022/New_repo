import React from "react";
import { useParams } from "react-router-dom";
import HeaderSidebarSet from "../../component/HeaderSidebar/HeaderSidebarSet";
import PostDetail from "../../element/PostDetail";
import Comment from "../../element/Comment";
import StudyPostDetail from "../../element/StudyPostDetail";

const FreeCardDetailPage = () => {
  const { postId } = useParams();

  return (
    <div>
      <HeaderSidebarSet />
      <div className="detail-page">
        <StudyPostDetail postId={postId} />
        <Comment postId={postId} />
      </div>
    </div>
  );
};

export default FreeCardDetailPage;
