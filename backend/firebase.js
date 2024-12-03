const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDY8Ri6qKW-nmYR0G241jAP01T2DTOnAHA",
    authDomain: "studentassistance-b6cc4.firebaseapp.com",
    databaseURL: "https://studentassistance-b6cc4-default-rtdb.firebaseio.com",
    projectId: "studentassistance-b6cc4",
    storageBucket: "studentassistance-b6cc4.firebasestorage.app",
    messagingSenderId: "337726047348",
    appId: "1:337726047348:web:a5768ac360f0fce3d6fd21",
    measurementId: "G-VDXR9JKB05"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
