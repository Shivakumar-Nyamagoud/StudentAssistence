const db = require('../firebase'); // Firebase configuration file
const chatHistoryRef = db.collection('chatHistory'); // Firestore collection reference

// Function to save a new chat
async function saveChat(query, response) {
    try {
        const newChat = {
            query,
            response,
            createdAt: new Date().toISOString(),
        };
        const docRef = await chatHistoryRef.add(newChat);
        return { id: docRef.id, ...newChat };
    } catch (error) {
        console.error("Error saving chat to Firestore:", error);
        throw new Error("Failed to save chat");
    }
}

// Function to fetch chat history
async function getChatHistory(limit = 10) {
    try {
        const snapshot = await chatHistoryRef.orderBy('createdAt', 'desc').limit(limit).get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching chat history from Firestore:", error);
        throw new Error("Failed to fetch chat history");
    }
}

module.exports = {
    saveChat,
    getChatHistory,
};
