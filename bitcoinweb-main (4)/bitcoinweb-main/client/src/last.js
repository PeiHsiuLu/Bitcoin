import React, { useState } from 'react';
import Axios from "axios";

function UserForum() {
    const scrollToUserForum = () => {
        const forumElement = document.querySelector('.message');
        forumElement.scrollIntoView({ behavior: 'smooth' });
    };

    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        let messageInput = e.target.message.value;
        if (messageInput.trim() !== '') {
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
            messageInput = messageInput.match(/.{1,40}/g).join("\n");
            const newMessage = {
                user: username,
                message: messageInput,
                timestamp: formattedDate,
                isLiked: false, // 初始設置未按讚
            };

            setMessages([...messages, newMessage]);
            e.target.reset();
        }
    };

    const commentCount = messages.length; // 計算留言數量

    const handleLike = (index) => {
        const updatedMessages = [...messages];
        updatedMessages[index].isLiked = !updatedMessages[index].isLiked;
        setMessages(updatedMessages);
    };

    /*MySQL*/


    return (
        <div className="message-container">
            <div className="message" onClick={scrollToUserForum}>用戶論壇</div>
            <br />
            <form onSubmit={handleMessageSubmit}>
                <div style={{ fontSize: "1.8vw" }}>用戶<input type="text" name="username" placeholder="你的名稱" style={{ fontSize: "1.8vw", fontFamily:"標楷體"}} value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                <br />
                <div style={{ fontSize: "1.8vw" }}>留言<input type="text" name="message" placeholder="想說什麼" style={{ fontSize: "1.8vw",fontFamily:"標楷體" }}/><button type="submit" style={{ fontSize: "1.8vw" }}>發送</button></div>
            </form>


            <br></br>

            <h1 style={{ display: 'flex', justifyContent: 'flex-start' }}>{commentCount}則留言</h1>

            <div className='container'>
                <div className="comment-section">
                    <fieldset>
                        <ul>
                            {messages.map((message, index) => (
                                // ...（之前的程式碼）

<div key={index} className="message-text">
    <div>
        <p>F{index + 1} - {message.timestamp} - {message.user}</p>
        {message.message}
        <button onClick={() => handleLike(index)} >
            {message.isLiked ? '收回讚' : '讚'}
        </button>
        <span>{message.isLiked ? '👍' : ''}</span>
        <br></br>
    </div>
</div>

                                
                            ))}
                        </ul>
                    </fieldset>
                </div>
                {/* ...其他內容 */}

            </div>
        </div>
    );
}

export default UserForum;

