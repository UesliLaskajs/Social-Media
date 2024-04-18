import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "social-media-mern-18dae.firebaseapp.com",
    projectId: "social-media-mern-18dae",
    storageBucket: "social-media-mern-18dae.appspot.com",
    messagingSenderId: "651185066789",
    appId: "1:651185066789:web:aa33a041be1400af1900cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
