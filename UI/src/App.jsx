import React from 'react';
import './App.css';
import Chatbot from './component/Chatbot';


  const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Chatbot/>
    </div>
  );
};

export default App;