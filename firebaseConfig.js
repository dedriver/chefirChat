import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD9k8GDXbmvoUNHcDp37-btDzaCWQ3foy0",
    authDomain: "chat-app-b1c95.firebaseapp.com",
    projectId: "chat-app-b1c95",
    storageBucket: "chat-app-b1c95.firebasestorage.app",
    messagingSenderId: "620860256772",
    appId: "1:620860256772:web:a3595728e608212f63bb51",
};

export const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app);
