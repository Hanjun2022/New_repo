import "./HomeContents.css";
import PromoData from "../../../api/BoardAPI/promotion.json";
import FreeData from "../../../api/BoardAPI/free.json";
import NewsData from "../../../api/BoardAPI/news.json";
import StudyData from "../../../api/BoardAPI/study.json";
import AskData from "../../../api/BoardAPI/ask.json";
import { Link } from "react-router-dom";

const HomeContents = () => {
  return (
    <div className="home_contents_div">
      <div className="white_board">
        {PromoData.slice(0, 4).map((post) => (
          <Link to={`promotionboard/${post.post_id}`} key={post.post_id}>
            <img src={post.image} className="promo_img" />
          </Link>
        ))}
      </div>
      <div className="other_board">
        <div className="inner_board">
          <div className="board_header">
            <h2>자유게시판</h2>
            <Link to="/freeboard" className="more_button">
              MORE +
            </Link>
          </div>
          <hr />
          {FreeData.slice(0, 5).map((post) => (
            <div className="inner_board_text_div" key={post.post_id}>
              <Link to={`freeboard/${post.post_id}`}>
                <p>{post.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="inner_board">
          <div className="board_header">
            <h2>뉴스게시판</h2>
            <Link to="/newsboard" className="more_button">
              MORE +
            </Link>
          </div>
          <hr />
          {NewsData.slice(0, 5).map((post) => (
            <div className="inner_board_text_div" key={post.post_id}>
              <Link to={`newsboard/${post.post_id}`}>
                <p>{post.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="inner_board">
          <div className="board_header">
            <h2>질문게시판</h2>
            <Link to="/askboard" className="more_button">
              MORE +
            </Link>
          </div>
          <hr />
          {AskData.slice(0, 5).map((post) => (
            <div className="inner_board_text_div" key={post.post_id}>
              <Link to={`askboard/${post.post_id}`}>
                <p>{post.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="inner_board">
          <div className="board_header">
            <h2>스터디게시판</h2>
            <Link to="/askboard" className="more_button">
              MORE +
            </Link>
          </div>
          <hr />
          {StudyData.slice(0, 5).map((post) => (
            <div className="inner_board_text_div" key={post.post_id}>
              <Link to={`studyboard/${post.post_id}`}>
                <p>{post.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeContents;
