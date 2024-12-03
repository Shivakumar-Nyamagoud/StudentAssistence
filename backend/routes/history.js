const express = require('express');
const { saveChat, getChatHistory } = require('../models/chat'); // Import Firebase utility functions

const router = express.Router();

// Route to fetch chat history
router.get('/', async (req, res) => {
    try {
        const history = await getChatHistory(); // Default limit to 10
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to save a new chat
router.post('/', async (req, res) => {
    const { query, response } = req.body;

    if (!query || !response) {
        return res.status(400).json({ error: "Query and response are required" });
    }

    try {
        const savedChat = await saveChat(query, response);
        res.json(savedChat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
