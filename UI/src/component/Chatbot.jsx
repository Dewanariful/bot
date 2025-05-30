import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        messages: newMessages.map(m => ({
          role: m.from === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
      });

      const botReply = response.data.reply;
      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-4 flex flex-col h-[500px] mx-auto mt-10">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-xl max-w-[75%] ${
              msg.from === 'bot'
                ? 'bg-blue-100 self-start'
                : 'bg-green-100 self-end ml-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="p-2 bg-blue-100 rounded-xl self-start">
            Typing...
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-xl p-2"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;git
