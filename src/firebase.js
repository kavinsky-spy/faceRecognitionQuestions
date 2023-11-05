// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

import { questionTimes, predominantEmotions, name } from "./script.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx5RqK_LZGc5mojAaTyW3cnu1s0oUixos",
  authDomain: "facerecognitionquestions.firebaseapp.com",
  projectId: "facerecognitionquestions",
  storageBucket: "facerecognitionquestions.appspot.com",
  messagingSenderId: "867353338806",
  appId: "1:867353338806:web:ff41db740c396c259b5717",
  measurementId: "G-QV4X7104ZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

export function insertData() {
  // Generate a unique ID for the user
  var uid = crypto.randomUUID();

  set(ref(db, "results/" + uid), {
    // questions: questions,
    name: name,
    times: questionTimes,
    emotions: predominantEmotions,
  })
    .then(() => {
      alert("Added!");
    })
    .catch((error) => {
      alert(error);
    });
}
