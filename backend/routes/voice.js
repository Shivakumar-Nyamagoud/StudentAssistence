const express = require('express');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const Chat = require('./chatmodel'); // Import the Chat model

const multer = require('multer');
const pdfParse = require('pdf-parse');

const router = express.Router();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to interact with the Gemini AI
async function getBotResponse(userInput) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });  // Example model name
        const result = await model.generateContent(userInput);
        console.log('Gemini API Response:', result);

        if (result && result.response && result.response.text) {
            return result.response.text();  // Return the generated response text
        } else {
            console.error('Error: Unexpected response structure from Gemini API');
            return 'Sorry, I couldn\'t process that request.';
        }
    } catch (error) {
        console.error('Error with Gemini API:', error);
        return 'Sorry, I couldn\'t process that request.';
    }
}

// Route to handle text-based chat interactions
router.post('/chat', async (req, res) => {
    const { userInput } = req.body;

    try {
        // Get the bot response from Gemini AI
        const botResponse = await getBotResponse(userInput);

        // Save the conversation to MongoDB
        await saveChatHistory(userInput, botResponse);

        // Send the response back to the client
        res.json({ botResponse });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get response from the bot.' });
    }
});

// Function to save chat history to MongoDB
async function saveChatHistory(userInput, botResponse) {
    try {
        const chat = new Chat({
            user: userInput,
            bot: botResponse
        });
        await chat.save(); // Save chat to MongoDB
        console.log('Chat history saved to MongoDB');
    } catch (e) {
        console.error('Error adding document to MongoDB:', e);
    }
}

// Route to get the recent chat history
router.get('/recent-chats', async (req, res) => {
    try {
        const recentChats = await Chat.find().sort({ timestamp: -1 }).limit(10); // Fetch the 10 most recent chats
        res.json(recentChats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recent chats.' });
    }
});



const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory for easy parsing
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'));
        }
    }
});

// Route to upload and process a PDF file
router.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
    try {
        const pdfBuffer = req.file.buffer; // Access the uploaded file buffer
        const pdfData = await pdfParse(pdfBuffer); // Parse the PDF to extract text

        res.json({ content: pdfData.text }); // Send the extracted text back to the client
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ error: 'Failed to process the PDF file.' });
    }
});

module.exports = router;
