// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import axios from 'axios';

// dotenv.config();

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// app.post('/api/chat', async (req, res) => {
//   const { messages } = req.body;

//   try {
//     const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
//       model: 'deepseek-chat', // or whatever model name DeepSeek uses
//       messages,
//       temperature: 0.7,
//       max_tokens: 2000
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
//       }
//     });

//     const reply = response.data.choices[0].message.content;
//     res.json({ reply });
//   } catch (error) {
//     console.error('Error from DeepSeek:', error.response?.data || error.message);
//     res.status(500).json({ 
//       error: 'Failed to get response from DeepSeek',
//       details: error.response?.data || error.message
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`✅ Server running on http://localhost:${port}`);
// });

// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI or Together.ai key
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1', // Override for Together.ai
});

app.post('/api/chat', async (req, res) => {
  const messages = req.body.messages;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Something went wrong with the AI API.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
