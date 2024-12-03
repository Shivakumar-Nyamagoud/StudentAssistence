const express = require('express');
const path = require('path');

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Route to serve homepage as default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Additional routes (if needed)
app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/student.html'));
});

app.get('/parents', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/parents.html'));
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
