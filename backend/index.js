const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const voiceRoutes = require('./routes/voice'); // Import the voice routes
require('dotenv').config();

const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API routes for voice assistant
app.use('/api/voice', voiceRoutes);

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
