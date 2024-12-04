const express = require('express');
const firebaseAdmin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors');

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: 'https://<your-database-name>.firebaseio.com'
});

const db = firebaseAdmin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

// YouTube API Key
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';

// Route to add a new course
app.post('/api/add-course', async (req, res) => {
  const { studentId, courseName, courseDescription, courseCredits } = req.body;

  // Store course in Firestore under student ID
  try {
    const docRef = await db.collection('students').doc(studentId).collection('courses').add({
      courseName,
      courseDescription,
      courseCredits,
      marks: null, // Marks will be added later
      grade: null, // Grade will be added later
    });

    // Get YouTube video recommendations based on course name
    const youtubeData = await getYouTubeRecommendations(courseName);
    
    res.status(200).json({
      message: 'Course added successfully!',
      courseData: {
        courseName,
        courseDescription,
        courseCredits,
        id: docRef.id // Return the ID of the course document
      },
      youtubeVideos: youtubeData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding course', details: error });
  }
});

// Helper function to fetch YouTube recommendations based on course name
async function getYouTubeRecommendations(courseName) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        q: courseName,
        key: YOUTUBE_API_KEY,
      },
    });

    return response.data.items.map(item => ({
      title: item.snippet.title,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return [];
  }
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
