// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfCJUYQHm39bARaZFH0twdfd0lyGcdfG0",
    authDomain: "trendy-crafts-web.firebaseapp.com",
    projectId: "trendy-crafts-web",
    storageBucket: "trendy-crafts-web.firebasestorage.app",
    messagingSenderId: "475172906675",
    appId: "1:475172906675:web:4cbfa32598c532ca8b32c6",
    measurementId: "G-9YPJ5Z58M4"
};

// Initialize Firebase
let app;
let analytics;

try {
    app = initializeApp(firebaseConfig);
    // Analytics only works in browser environment
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
}

export { app, analytics };
