import React from "react";
import { useParams } from "react-router-dom";
import HeaderSidebarSet from "../../component/HeaderSidebar/HeaderSidebarSet";
import PostDetail from "../../element/PostDetail";
import Comment from "../../element/Comment";

const FreeCardDetailPage = () => {
  const { postId } = useParams();

  return (
    <div>
      <HeaderSidebarSet />
      <div className="detail-page">
        <PostDetail postId={postId} />
        <Comment postId={postId} />
      </div>
    </div>
  );
};

export default FreeCardDetailPage;
