import React, { useState, useEffect } from 'react';
import { database } from './firebaseConfig'; // Import the Firebase database
import { ref, push, onValue, update } from 'firebase/database'; // Import necessary Firebase database methods

// Helper function to format date and time
const formatDateTime = (date) => {
  const currentDate = new Date(date);
  return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
};

function UserForum() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [replyData, setReplyData] = useState({});

  useEffect(() => {
    // Listen for changes in the Firebase database
    const messagesRef = ref(database, 'forum/messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMessages = Object.entries(data).map(([id, msg]) => ({
          id,
          ...msg,
          timestamp: formatDateTime(msg.timestamp), // Format timestamp
        }));
        setMessages(formattedMessages);
      }
    });
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageInput = e.target.message.value.trim();
    if (messageInput !== '' && username.trim() !== '') {
      const currentDate = new Date();
      const formattedDate = formatDateTime(currentDate);

      // Create the new message object
      const newMessage = {
        user: username,
        message: messageInput,
        timestamp: formattedDate,
        isLiked: false,
        replies: {},
      };

      // Push the new message to Firebase
      push(ref(database, 'forum/messages'), newMessage);
      e.target.reset();
    } else {
      alert('請輸入用戶名和留言內容！');
    }
  };

  const handleLike = (messageId, isLiked) => {
    const messageRef = ref(database, `forum/messages/${messageId}`);
    update(messageRef, { isLiked: !isLiked });
  };

  const handleReplySubmit = (e, messageId) => {
    e.preventDefault();
    const replyText = replyData[messageId]?.text || '';
    const replyUser = replyData[messageId]?.user || '';

    if (replyText.trim() !== '' && replyUser.trim() !== '') {
      const newReply = {
        user: replyUser.trim(),
        message: replyText.trim(),
        timestamp: formatDateTime(new Date()), // Format timestamp
        isLiked: false,
      };

      // Update the replies in Firebase
      const repliesRef = ref(database, `forum/messages/${messageId}/replies`);
      push(repliesRef, newReply);

      // Reset the reply form data
      setReplyData({ ...replyData, [messageId]: { text: '', user: '' } });
    } else {
      alert('請輸入用戶名和回覆內容！');
    }
  };

  const handleReplyLike = (messageId, replyId, isLiked) => {
    const replyRef = ref(database, `forum/messages/${messageId}/replies/${replyId}`);
    update(replyRef, { isLiked: !isLiked });
  };

  const handleReplyChange = (e, messageId, field) => {
    setReplyData({
      ...replyData,
      [messageId]: {
        ...replyData[messageId],
        [field]: e.target.value,
      },
    });
  };

  const commentCount = messages.length;

  return (
    <div className="message-container">
      <div className="message">用戶論壇</div>
      <br />
      <form onSubmit={handleMessageSubmit}>
        <div>
          用戶
          <input
            type="text"
            name="username"
            placeholder="你的名稱"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          留言
          <input type="text" name="message" placeholder="想說什麼" />
          <button type="submit" style={{ marginLeft: '0.8vw' }}>發送</button>
        </div>
      </form>
      <br />
      <h1 className="centered-heading">{commentCount} 則留言</h1>
      <div className="container">
        <div className="comment-section">
          <fieldset>
            <ul>
              {messages.map((message, index) => (
                <li key={message.id} className="message-text" style={{ textAlign: 'left', marginLeft: '-2vw' }}>
                  <div>
                    <p>
                      F{index + 1} - {message.timestamp} - {message.user}
                    </p>
                    {message.message.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                    <button
                      onClick={() => handleLike(message.id, message.isLiked)}
                      style={{ marginLeft: '1vw' }}
                      className={message.isLiked ? 'liked' : ''}
                    >
                      {message.isLiked ? '收回讚' : '讚'}
                    </button>
                    <span>{message.isLiked ? '👍' : ''}</span>
                    <br />
                    <form onSubmit={(e) => handleReplySubmit(e, message.id)}>
                      <input
                        type="text"
                        value={replyData[message.id]?.user || ''}
                        onChange={(e) => handleReplyChange(e, message.id, 'user')}
                        placeholder="你的名稱"
                      />
                      <input
                        type="text"
                        value={replyData[message.id]?.text || ''}
                        onChange={(e) => handleReplyChange(e, message.id, 'text')}
                        placeholder="回覆留言"
                      />
                      <button type="submit" style={{ marginLeft: '0.8vw' }}>回覆</button>
                    </form>
                    {message.replies && Object.entries(message.replies).map(([replyId, reply]) => (
                      <div
                        key={replyId}
                        style={{ marginLeft: '2vw', borderTop: '0.1vw solid #ddd', paddingTop: '0.5vw' }}
                      >
                        <p>
                          {reply.timestamp} - {reply.user}
                        </p>
                        <p>{reply.message}</p>
                        <button
                          onClick={() => handleReplyLike(message.id, replyId, reply.isLiked)}
                          style={{ marginLeft: '1vw' }}
                          className={reply.isLiked ? 'liked' : ''}
                        >
                          {reply.isLiked ? '收回讚' : '讚'}
                        </button>
                        <span>{reply.isLiked ? '👍' : ''}</span>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default UserForum;
