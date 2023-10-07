// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

import {
  getDatabase,
  set,
  get,
  update,
  remove,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const db = getDatabase();

var questionMain = document.querySelector(".main-question");
var userForm = document.querySelector(".user-form");
var enterID = document.querySelector("#enterID");
var enterName = document.querySelector("#enterName");
var enterAge = document.querySelector("#enterAge");
var findID = document.querySelector("#findID");
var findName = document.querySelector("#findName");
var findAge = document.querySelector("#findAge");

var insertButton = document.querySelector("#insert");
var updateButton = document.querySelector("#update");
var removeButton = document.querySelector("#remove");
var findButton = document.querySelector("#find");
// var answerSelected =

function insertData() {
  set(ref(db, "users/" + enterID.value), {
    Name: enterName.value,
    ID: enterID.value,
    Age: enterAge.value,
  })
    .then(() => {
      userForm.classList.add("hidden");
      questionMain.classList.remove("hidden");
      alert("Added!");
    })
    .catch((error) => {
      alert(error);
    });
}

/**
 *
 * @returns trueValuesArray Object just with right answers.
 * It will return false if there is no answers found.
 */
function getRightAnswers() {
  const dbref = ref(db);

  get(child(dbref, "questions/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let rightAnswers = [];

        let answers = snapshot.val();
        Object.keys(answers).forEach((key) => {
          rightAnswers.push(answers[key].answer);
        });

        // Returns just the right answers.
        const trueValuesArray = [];
        rightAnswers.forEach((obj) => {
          for (const key in obj) {
            if (obj[key] === true) {
              trueValuesArray.push(key);
            }
          }
        });

        console.log(trueValuesArray);
        return trueValuesArray;
      } else {
        alert("No data found");
      }
    })
    .catch((error) => {
      alert(error);
    });
  return false;
}

/**
 *
 * @returns questions Object with Text of every question.
 * It will return false if there is no answers found.
 */
function getAllQuestions() {
  const dbref = ref(db);

  get(child(dbref, "questions/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let snapValues = snapshot.val();
        const questions = [];
        for (const question of snapValues) {
          questions.push(question.Text);
        }
        return questions;
      } else {
        alert("No data found");
      }
    })
    .catch((error) => {
      alert(error);
    });
  return false;
}

function fillQuestions() {
  const textObject = {
    0: "What is the largest mammal in the world?",
    1: 'Who wrote the play "Romeo and Juliet"?',
    2: "What is the chemical symbol for the element gold?",
    3: "Which country is known as the Land of the Rising Sun?",
    4: "Which famous scientist is known for the theory of relativity?",
    5: "What is the largest planet in our solar system?",
  };

  for (const key in textObject) {
    if (textObject.hasOwnProperty(key)) {
      const textValue = textObject[key];
      const div = document.getElementById(`textValue${key}`);
      if (div) {
        div.textContent = textValue;
      }
    }
  }
  console.log(textValue);
}

function findData() {
  const dbref = ref(db);

  get(child(dbref, "questions/" + findID.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        findName.innerHTML = "Name: " + snapshot.val().Text;

        let answers = snapshot.val().answer;
        Object.keys(answers).forEach((key) => {
          if (answers[key] == true) {
            findAge.innerHTML = "Age: " + key;
            console.log(key, answers[key]);
          }
        });
      } else {
        alert("No data found");
      }
    })
    .catch((error) => {
      alert(error);
    });
}

insertButton.addEventListener("click", insertData);
findButton.addEventListener("click", fillQuestions);
updateButton.addEventListener("click", UpdateData);
removeButton.addEventListener("click", RemoveData);
