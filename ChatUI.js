import './ChatUI.css';
import { IoLogIn } from "react-icons/io5";
import { createGlobalStyle } from 'styled-components';
import { useState } from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className='main'>
      <GlobalStyle />
      <nav className='head'>
        <p className='title'>AhChat</p>
        <IoLogIn className='login' size="30" color="#555" />
      </nav>
      <div className='container'>
        <div className='left'>
        </div>
        <div className='right'>
          <div className='chatBox'>
            <div className='chatMessages'>
              {messages.map((message, index) => (
                <div key={index} className='message'>
                  <div className='messageBox'>{message}</div>
                </div>
              ))}
            </div>
            <div className='chatInput'>
              <input 
                type='text' 
                placeholder='Type a message...' 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
