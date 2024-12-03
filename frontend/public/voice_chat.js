const startVoiceChatButton = document.getElementById('voice-button');
const spokenText = document.getElementById('spoken-text');
const responseText = document.getElementById('response-text');
const userInputField = document.getElementById('user-input');
const sendTextButton = document.getElementById('send-text');
const historyList = document.getElementById("history-list");
const toggleContrastButton = document.getElementById('toggle-contrast');

// Initialize Speech Recognition (Web Speech API)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;

// Handle recognition events
recognition.onstart = () => {
  spokenText.textContent = "Listening for your command...";
};

recognition.onresult = async (event) => {
  const userInput = event.results[event.results.length - 1][0].transcript;
  spokenText.textContent = `You said: "${userInput}"`;

  // Process the user input and get a bot response
  const botResponse = await getBotResponse(userInput);

  // Display the bot response
  responseText.textContent = `Bot: ${botResponse}`;

  // Speak the bot response aloud
  speakText(botResponse);

  // Clear the input field
  userInputField.value = '';
};

// Error handling for recognition
recognition.onerror = (event) => {
  console.error('Speech Recognition error:', event.error);
};

// Start voice chat when the button is clicked
startVoiceChatButton.addEventListener('click', () => {
  recognition.start();
});

// Send text input when the user clicks the 'Send' button or presses 'Enter'
sendTextButton.addEventListener('click', handleSendText);
userInputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleSendText();
  }
});

// Function to get bot response from the backend
async function getBotResponse(userInput) {
  try {
    const response = await fetch('/api/voice/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput })
    });

    const data = await response.json();
    return data.botResponse;
  } catch (error) {
    console.error('Error fetching response:', error);
    return 'Sorry, I couldn\'t process that request.';
  }
}

// Function to display chat history
async function displayChatHistory(userInput, botResponse) {
  const userBox = document.createElement('div');
  userBox.classList.add('chat-box', 'user-box');
  userBox.textContent = `You: ${userInput}`;
  historyList.appendChild(userBox);

  const botBox = document.createElement('div');
  botBox.classList.add('chat-box', 'bot-box');
  botBox.textContent = `Bot: ${botResponse}`;
  historyList.appendChild(botBox);

  // Scroll to the bottom of the chat history
  historyList.scrollTop = historyList.scrollHeight;
}

// Function to speak text aloud
function speakText(text) {
  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US"; // Set the language to English
  window.speechSynthesis.speak(speech);
}

// Load previous chats when the page loads
window.onload = async () => {
  try {
    const response = await fetch('/api/voice/recent-chats');
    const recentChats = await response.json();

    recentChats.forEach(chat => {
      displayChatHistory(chat.user, chat.bot);
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
  }
};

// Toggle high contrast mode
toggleContrastButton.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});

// Function to handle sending the text message
async function handleSendText() {
  const userInput = userInputField.value.trim();
  if (userInput) {
    spokenText.textContent = `You typed: "${userInput}"`;

    // Process the user input and get a bot response
    const botResponse = await getBotResponse(userInput);

    // Display the bot response
    responseText.textContent = `Bot: ${botResponse}`;

    // Speak the bot response aloud
    speakText(botResponse);

    // Clear the text input field
    userInputField.value = '';

    // Add the conversation to the chat display
    displayChatHistory(userInput, botResponse);
  }
}


const uploadPdfInput = document.getElementById('upload-pdf');
const playPdfSpeechButton = document.getElementById('play-pdf-speech');
const stopPdfSpeechButton = document.getElementById('stop-pdf-speech');
let extractedPdfText = '';

// Function to handle PDF upload
async function handlePdfUpload(event) {
    const file = event.target.files[0];

    if (!file) {
        alert('Please select a PDF file.');
        return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
        const response = await fetch('/api/voice/upload-pdf', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.content) {
            extractedPdfText = data.content;
            alert('PDF uploaded and processed successfully!');
        } else {
            alert('Failed to process PDF.');
        }
    } catch (error) {
        console.error('Error uploading PDF:', error);
        alert('Failed to upload and process the PDF file.');
    }
}

// Function to play the extracted PDF text as speech
function playPdfSpeech() {
    if (!extractedPdfText) {
        alert('No PDF content available to read.');
        return;
    }

    // Stop ongoing speech before starting new
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(extractedPdfText);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

// Function to stop ongoing speech
function stopPdfSpeech() {
    window.speechSynthesis.cancel();
}

// Event listeners for PDF upload, playback, and stop
uploadPdfInput.addEventListener('change', handlePdfUpload);
playPdfSpeechButton.addEventListener('click', playPdfSpeech);
stopPdfSpeechButton.addEventListener('click', stopPdfSpeech);
