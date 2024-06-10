import React from "react";
import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import UserData from "../../api/user.json"


const APIId = UserData.user_name; //유저의 현재 id
let APILogedIn = UserData.isLogedin; //로그인 상태
const APIMajor = UserData.user_major; //유저가 보고 있는 학과
const APIEmail = UserData.user_email;

const Header = ({ onToggleSidebar }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [Major, setMajor] = useState(false);
  const BoardNumber = localStorage.getItem("BoardNum");

  const LogoModal = () => {
    return (
      <div className="logo-modal"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <ul>
          <li className="name">{APIId}</li>
          <li><a href="mailto:recipient@example.com?subject=&body=" className="email">{APIEmail}</a></li>
          <li><Link to={"/write"}>글쓰기</Link></li>
          <li><Link to='/chat'>채팅</Link></li>
          <li><Link to="/mypage">마이페이지</Link></li>
          <li><a>로그아웃</a></li>
        </ul>
      </div>
    );
  }

  

  return (
    <div>
      <div className="first-header">
        <Link to="/" className="title-link"><h1>전공마당</h1></Link>
        <ul>
          <li><Link to={!APILogedIn && "/login"}>{APILogedIn ? <Link to="/mypage">안녕하세요 {APIId}님</Link> : "로그인"}</Link></li>
          <li><button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <Link to={!APILogedIn && "/signup"} className="button">
              {APILogedIn ? "Ξ" : "가입하기"}
            </Link></button></li>
          {isHovered && <LogoModal />}
        </ul>
      </div>
      <hr />
      <div className="second-header">
        <ul>
          <li><a onClick={onToggleSidebar}>게시판</a></li>
          <li><Link to='/write' >글쓰기</Link></li>
          <li><a onClick={() => Major ? setMajor(false) : setMajor(true)}>과: {BoardNumber == 1 ? "소프트웨어학과" : "경영학과"}</a></li>
          {Major ? <div className="changeMajorModal">
            <ul>
              <li>인문계열</li>
              <li>사회계열</li>
              <li>교육계열</li>
              <li>자연계열</li>
              <li>공학계열</li>
              <li>의학계열</li>
              <li>예체능계열</li>
              <hr />
            </ul>
            <div className="majorItems">
              <ul>
                <li><a>국어국문학과</a></li>
                <li><a>일본어과</a></li>
                <li><a>스페인어학과</a></li>
                <li><a>불어불문학과</a></li>
                <li><a>고고학과</a></li>
                <li><a>철학과</a></li>
              </ul>
              <ul>
                <li><a onClick={()=>localStorage.setItem("BoardNum", 6)}>경영학과</a></li>
                <li><a>신문방송학과</a></li>
                <li><a>경찰행정학과</a></li>
                <li><a>경제학과</a></li>
                <li><a>관광경영학과</a></li>
                <li><a>법학과</a></li>
              </ul>
              <ul>
                <li><a>가정교육과</a></li>
                <li><a>건설공학교육과</a></li>
                <li><a>유아교육과</a></li>
                <li><a>초등교육과</a></li>
                <li><a>교육학과</a></li>
                <li><a>특수교육학과</a></li>
              </ul>
              <ul>
                <li><a>생명공학과</a></li>
                <li><a>생명과학과</a></li>
                <li><a>통계학과</a></li>
                <li><a>호텔조리과</a></li>
                <li><a>식품영양학과</a></li>
                <li><a>애완동물과</a></li>
              </ul>
              <ul>
                <li><a onClick={()=>localStorage.setItem("BoardNum", 1)}>소프트웨어학과</a></li>
                <li><a>컴퓨터공학과</a></li>
                <li><a>화학공학과</a></li>
                <li><a>건축학과</a></li>
                <li><a>건축공학과</a></li>
                <li><a>신소재공학과</a></li>
              </ul>
              <ul>
                <li><a>간호학과</a></li>
                <li><a>물리치료학과</a></li>
                <li><a>의예과</a></li>
                <li><a>간호과</a></li>
                <li><a>약학과</a></li>
                <li><a>치위생과</a></li>
              </ul>
              <ul>
                <li><a>시각디자인과</a></li>
                <li><a>체육학과</a></li>
                <li><a>실용음악학과</a></li>
                <li><a>만화에니메이션학과</a></li>
                <li><a>영극영화과</a></li>
                <li><a>산업디자인학과</a></li>
              </ul>
            </div>
          </div> : ""}
        </ul>
      </div>
      <hr />
    </div >
  );
};

export default Header;
