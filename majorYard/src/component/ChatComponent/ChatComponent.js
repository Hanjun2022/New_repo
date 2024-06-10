import React, { useEffect, useState } from "react";
import './ChatComponent.css'
import UserData from '../../api/user.json'
import ChatRoomData from '../../api/ChatAPI/chatRoom.json'
import ChatMessageData from '../../api/ChatAPI/chatRoomMessage.json'

const ChatComponent = () => {
    const [userSearch, setUserSearch] = useState("");
    const [displayedUser, setDisplayedUser] = useState([]);
    const [chatUser, setChatUser] = useState(ChatRoomData[0].chatroom_name);
    const [chatUserPK, setChatUserPK] = useState(ChatRoomData[0].pk);
    const [messages, setMessages] = useState([]);

    const ChatRoomCard = ({ ChatRoomName, ChatRoomPK }) => {
        return (
            <div className="chatroom-divdiv">
                <div className=" chat-room-card-div">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyZ0aYlmmLhcu-tEs3jBVkQzNBfGDUVhrUvw&s" alt="프로필사진" />
                    <div className="chatroom-card-name-contents-div">
                        <h3>{ChatRoomName}</h3>
                        <p>{ChatMessageData[ChatRoomPK].message[0].text}</p>
                    </div>
                </div>
                <hr />
            </div>
        )
    }

    const ChatMessageCard = ({ date, text, sender }) => {
        return (
            <div className="ChatMessageCard-div">
                {sender === UserData.user_name ?
                    // 내가 보낸 경우
                    <div className="myMessageDiv">
                        <div className="space-for-message"></div>
                        <div className="my-message-card">
                            <h4>{text}</h4>
                            <p>{date}</p>
                        </div >
                    </div>

                    : <div>
                        <div className="your-message-card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyZ0aYlmmLhcu-tEs3jBVkQzNBfGDUVhrUvw&s" />
                            <div className="name-text-separate">
                                <p>{sender}</p>
                                <div>
                                    <h4>{text}</h4>
                                    <p>{date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

    const handleSearch = () => {
        const results = ChatRoomData.filter((data) =>
            data.chatroom_name.toLowerCase().includes(userSearch.toLowerCase())
        );
        setDisplayedUser(results);
    };

    const setChattingUser = (chatroom_name, pk) => {
        setChatUser(chatroom_name);
        setChatUserPK(pk);
    }

    useEffect(() => {
        handleSearch();
    }, []);

    useEffect(() => {
        // Update messages when chatUserPK changes
        setMessages(ChatMessageData[chatUserPK]?.message || []);
    }, [chatUserPK]);

    return (
        <div className="chat-div">
            <div className="search-header-div">
                <input
                    className="search-user-input"
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="사용자이름을 입력하세요."
                />
                <button onClick={handleSearch}>검색</button>
                <img src={UserData.user_pic} alt="user_pic" />
                <p className="chat-user-name">{UserData.user_name}</p>
            </div>
            <div className="chat-room-title-div">
                <h1>Chat Room</h1>
            </div>

            <div className="chat-contents-div">
                <div className="chat-sidebar-div">
                    {displayedUser.map((data) => (
                        <a key={data.pk} onClick={() => setChattingUser(data.chatroom_name, data.pk)}>
                            <ChatRoomCard
                                ChatRoomName={data.chatroom_name}
                                ChatRoomPK={data.pk}
                            />
                        </a>
                    ))}
                </div>
                <div className="chat-message-div">
                    <div className="chat-message-card-div">
                        <div className="chat-message-card-header-div">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyZ0aYlmmLhcu-tEs3jBVkQzNBfGDUVhrUvw&s" alt="프로필사진" />
                            <h3>{chatUser}</h3>
                        </div>
                        <hr />
                    </div>
                    <div className="chat-messages-list-div">
                        {messages.map((message, index) => (
                            <ChatMessageCard
                                key={index}
                                text={message.text}
                                sender={message.sender_name}
                                date={message.createdTime.substr(10, 6)}
                            />
                        ))}
                    </div>
                    <div className="chat-message-input-div">
                        <input type="text" placeholder="메시지를 입력하세요." />
                        <button>전송</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ChatComponent;
