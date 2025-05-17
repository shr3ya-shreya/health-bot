import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatBottomRef = useRef(null);
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const currentLastMessage = messages[messages.length - 1];
    if (currentLastMessage && lastMessageRef.current !== currentLastMessage) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      lastMessageRef.current = currentLastMessage;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      try {
        const response = await axios.post('http://127.0.0.1:8000/friendly_chat', { message: input });
        const botMessage = { text: response.data.response, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorBotMessage = { text: 'Sorry, an error occurred.', sender: 'bot', isError: true };
        setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
      }
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div ref={chatContainerRef} style={styles.chatContainer}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>ShePulse~</h2>
        </div>
        <div style={styles.messageContainer}>
          {messages.length === 0 && (
            <div style={styles.emptyState}>
              Start a conversation...
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(message.sender === 'user' ? styles.userMessage : styles.botMessage),
                ...(message.isError && styles.errorMessage),
              }}
            >
              {message.text}
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            style={styles.input}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage} style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    padding: '0',
    margin: '0',
    overflow: 'hidden',
    backgroundColor: '#121212',
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
  },
  chatContainer: {
    height: '600px',
    width: '550px',
    border: '1px solid #333',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1e1e1e',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(227, 162, 183, 0.5)',
  },
  header: {
    backgroundColor: '#252525',
    padding: '15px 20px',
    borderBottom: '1px solid #333',
  },
  headerText: {
    color: '#fff',
    margin: '0',
    fontWeight: '500',
    fontSize: '1.2em',
  },
  messageContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  emptyState: {
    textAlign: 'center',
    color: '#666',
    marginTop: '40%',
    fontSize: '1.1em',
    fontStyle: 'italic',
  },
  message: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: '18px',
    marginBottom: '12px',
    clear: 'both',
    wordBreak: 'break-word',
    fontSize: '0.95em',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.4',
  },
  userMessage: {
    backgroundColor: '#4a5568',
    alignSelf: 'flex-end',
    float: 'right',
    color: '#fff',
    borderBottomRightRadius: '4px',
    marginLeft: 'auto',
  },
  botMessage: {
    backgroundColor: '#2d3748',
    alignSelf: 'flex-start',
    float: 'left',
    color: '#e2e8f0',
    borderBottomLeftRadius: '4px',
    marginRight: 'auto',
  },
  errorMessage: {
    backgroundColor: '#742a2a',
    color: '#fbd38d',
  },
  inputContainer: {
    display: 'flex',
    padding: '15px',
    backgroundColor: '#252525',
    borderTop: '1px solid #333',
  },
  input: {
    flex: 1,
    padding: '12px 15px',
    borderRadius: '25px',
    border: '1px solid #444',
    marginRight: '10px',
    fontSize: '0.95em',
    fontFamily: 'inherit',
    backgroundColor: '#333',
    color: '#fff',
    outline: 'none',
  },
  sendButton: {
    padding: '10px 20px',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#4299e1',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.95em',
    fontFamily: 'inherit',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
};

export default Chat;