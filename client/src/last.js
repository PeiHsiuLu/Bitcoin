import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function UserForum() {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [replyTexts, setReplyTexts] = useState({});

    // 从服务器获取消息
    useEffect(() => {
        Axios.get('http://localhost:3000/messages')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

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
                isLiked: false,
                replies: [],
            };

            Axios.post('http://localhost:3000/messages', newMessage)
                .then(response => {
                    setMessages([...messages, response.data]);
                    e.target.reset();
                })
                .catch(error => {
                    console.error('Error saving message:', error);
                });
        }
    };

    const handleLike = (index) => {
        const updatedMessages = [...messages];
        const updatedMessage = { ...updatedMessages[index], isLiked: !updatedMessages[index].isLiked };
        updatedMessages[index] = updatedMessage;

        // 发送更新后的按赞状态到服务器
        Axios.put(`http://localhost:3000/messages/${updatedMessage._id}`, updatedMessage)
            .then(response => {
                setMessages(updatedMessages);
            })
            .catch(error => {
                console.error('Error updating message:', error);
            });
    };

    const handleReplySubmit = (e, index) => {
        e.preventDefault();
        const replyText = replyTexts[index] || '';
        if (replyText.trim() !== '') {
            const newReply = {
                user: username,
                message: replyText,
                timestamp: new Date().toLocaleString(),
            };

            const updatedMessages = [...messages];
            updatedMessages[index].replies.push(newReply);

            // 发送更新后的消息到服务器
            Axios.put(`http://localhost:3000/messages/${updatedMessages[index]._id}`, updatedMessages[index])
                .then(response => {
                    setMessages(updatedMessages);
                    setReplyTexts({ ...replyTexts, [index]: '' });
                })
                .catch(error => {
                    console.error('Error updating message:', error);
                });
        }
    };

    const handleReplyChange = (e, index) => {
        setReplyTexts({ ...replyTexts, [index]: e.target.value });
    };

    const commentCount = messages.length;

    return (
        <div className="message-container">
            <div className="message">用戶論壇</div>
            <br />
            <form onSubmit={handleMessageSubmit}>
                <div style={{ fontSize: "1.8vw" }}>用戶
                    <input type="text" name="username" placeholder="你的名稱" style={{ fontSize: "1.8vw", fontFamily:"標楷體"}} value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <br />
                <div style={{ fontSize: "1.8vw" }}>留言
                    <input type="text" name="message" placeholder="想說什麼" style={{ fontSize: "1.8vw",fontFamily:"標楷體" }}/>
                    <button type="submit" style={{ fontSize: "1.8vw" }}>發送</button>
                </div>
            </form>
            <br />
            <h1 style={{ display: 'flex', justifyContent: 'flex-start' }}>{commentCount}則留言</h1>
            <div className='container'>
                <div className="comment-section">
                    <fieldset>
                        <ul>
                            {messages.map((message, index) => (
                                <div key={index} className="message-text">
                                    <div>
                                        <p>F{index + 1} - {message.timestamp} - {message.user}</p>
                                        {message.message.split("\n").map((line, idx) => (
                                            <p key={idx}>{line}</p>
                                        ))}
                                        <button onClick={() => handleLike(index)} >
                                            {message.isLiked ? '收回讚' : '讚'}
                                        </button>
                                        <span>{message.isLiked ? '👍' : ''}</span>
                                        <br />
                                        <form onSubmit={(e) => handleReplySubmit(e, index)}>
                                            <input
                                                type="text"
                                                value={replyTexts[index] || ''}
                                                onChange={(e) => handleReplyChange(e, index)}
                                                placeholder="回复留言"
                                            />
                                            <button type="submit">回复</button>
                                        </form>
                                        {message.replies && message.replies.map((reply, replyIndex) => (
                                            <div key={replyIndex} style={{ marginLeft: '20px' }}>
                                                <p>{reply.timestamp} - {reply.user}</p>
                                                <p>{reply.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default UserForum;
