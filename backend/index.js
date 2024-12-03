const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const voiceRoutes = require('./routes/voice');  // Add this line for voice chat route
require('dotenv').config();

const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Add voice routes
app.use('/api/voice', voiceRoutes);

// Route to serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
