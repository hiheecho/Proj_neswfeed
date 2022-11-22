// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyDsC6IMmSPaQLozZsNiCfLi8gsOAxpn4gw",
  authDomain: "soonjae-pj.firebaseapp.com",
  projectId: "soonjae-pj",
  storageBucket: "soonjae-pj.appspot.com",
  messagingSenderId: "895652044822",
  appId: "1:895652044822:web:f4062b3f4dd40d67919537",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
