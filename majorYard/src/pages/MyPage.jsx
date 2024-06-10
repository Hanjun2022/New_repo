import React, { useState } from "react";
import "./MyPage.css";
import CardList from "../component/CardList";
import HeaderSidebarSet from "../component/HeaderSidebar/HeaderSidebarSet";
import MemberCardList from "../component/MemberCardList";

const MyPage = () => {
  const initialUserData = {
    loginId: "useruser",
    userName: "박성진",
    nickName: "soohak_",
    password: "8080",
    userPhone: "01023837293",
    gender: "FEMALE",
    userBirth: "2000",
    schoolEmail: "ha1234@kau.kr",
    user_major: "소프트웨어학과",
    user_intro: "코딩 별거 없드라 ㅋㅋ",
    user_pic:
      "https://jmagazine.joins.com/_data2/photo/2021/04/838745483_FJchmDQj_7.jpg",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("포스트");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 수정된 userData를 저장하거나 전송하는 로직을 구현합니다.
    closeModal();
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <HeaderSidebarSet />
      <div className="mypage-container">
        <div className="profile-section">
          <div className="profile-top">
            <img
              alt="프로필 이미지"
              className="profile-image"
              src={userData.user_pic}
            />
            <div className="name-id-grade">
              <div className="name">{userData.userName}</div>
              <div className="id-grade">
                <div className="id">{userData.loginId}</div>
                <div className="grade">{userData.userBirth}</div>
              </div>
            </div>
          </div>
          <div className="introduction">{userData.user_intro}</div>
          <button className="edit-myprofile-button" onClick={openModal}>
            프로필 수정하기
          </button>
        </div>
        <div className="content">
          <div className="option-bar">
            <button
              className={`option-button ${
                activeButton === "포스트" ? "active" : ""
              }`}
              onClick={() => handleClick("포스트")}
            >
              포스트
            </button>
            <button
              className={`option-button ${
                activeButton === "스크랩" ? "active" : ""
              }`}
              onClick={() => handleClick("스크랩")}
            >
              스크랩
            </button>
            <button
              className={`option-button ${
                activeButton === "구독한 회원" ? "active" : ""
              }`}
              onClick={() => handleClick("구독한 회원")}
            >
              구독한 회원
            </button>
          </div>
          <div className="option-content">
            {activeButton === "포스트" && <CardList />}
            {activeButton === "스크랩" && <CardList />}
            {activeButton === "구독한 회원" && <MemberCardList />}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="profile-edit-modal">
          <div className="profile-edit-modal-content">
            <div className="profile-edit-modal-title">내 정보 수정</div>
            <form onSubmit={handleSubmit}>
              <label>
                이름:
                <input
                  className="profile-edit-input"
                  type="text"
                  name="userName"
                  value={userData.userName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                닉네임:
                <input
                  className="profile-edit-input"
                  type="text"
                  name="nickName"
                  value={userData.nickName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                번호:
                <input
                  className="profile-edit-input"
                  type="text"
                  name="userPhone"
                  value={userData.userPhone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                성별:
                <select
                  className="profile-edit-input"
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">성별을 선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="other">기타</option>
                </select>
              </label>
              <label>
                생년월일:
                <input
                  className="profile-edit-input"
                  type="text"
                  name="userBirth"
                  value={userData.userBirth}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                학과:
                <input
                  className="profile-edit-input"
                  type="text"
                  name="user_major"
                  value={userData.user_major}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                이메일:
                <input
                  className="profile-edit-input"
                  type="email"
                  name="schoolEmail"
                  value={userData.schoolEmail}
                  onChange={handleInputChange}
                />
              </label>
              <div className="profile-edit-buttons">
                <button type="submit" className="profile-edit-save-button">
                  저장
                </button>
                <button
                  type="button"
                  className="profile-edit-close-button"
                  onClick={closeModal}
                >
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
