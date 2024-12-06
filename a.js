const API_KEY = 'AIzaSyB8aNfku-PgGfCPOBrcZ4Nz_WZL2OOa4oo'; // Replace this with your YouTube API Key
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

document.getElementById('searchButton').addEventListener('click', () => {
  const course = document.getElementById('course').value;
  if (!course) {
    alert('Please enter a course name!');
    return;
  }

  fetchVideos(course);
});

async function fetchVideos(course) {
  try {
    const url = `${BASE_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(course)}&type=video&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    displayResults(data.items);
  } catch (error) {
    console.error('Error fetching videos:', error);
    alert('An error occurred while fetching videos.');
  }
}

function displayResults(videos) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!videos.length) {
    resultsDiv.innerHTML = '<p>No videos found.</p>';
    return;
  }

  videos.forEach((video) => {
    const videoDiv = document.createElement('div');
    videoDiv.innerHTML = `
      <h3>${video.snippet.title}</h3>
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
        <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
      </a>
    `;
    resultsDiv.appendChild(videoDiv);
  });
}
