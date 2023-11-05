import questions from "./src/questions.js";
import { insertData } from "./src/firebase.js";

const video = document.getElementById("video");
let questionStartTime;
const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const spnImg = document.querySelector(".spnImg");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const questionEmotions = [];
const contentlogin = document.querySelector(".content-login");
export let name = document.getElementById("name-input").value;
document.getElementById("buttonName").onclick = startQuiz;
let currentIndex = 0;
let questionsCorrect = 0;
export let questionTimes = [];
export let predominantEmotions = [];

const once =
  (fn) =>
  (...args) => {
    if (!fn) return;
    fn(...args);
    fn = null;
  };

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("models/"),
  faceapi.nets.faceLandmark68Net.loadFromUri("models/"),
  faceapi.nets.faceRecognitionNet.loadFromUri("models/"),
  faceapi.nets.faceExpressionNet.loadFromUri("models/"),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  const element = document.getElementById("video-container");
  once(element.append(canvas));
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(
    async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      if (detections[0].expressions["happy"] >= 0.25) {
        questionEmotions[currentIndex] = "Feliz";
      } else if (detections[0].expressions["angry"] >= 0.25) {
        questionEmotions[currentIndex] = "Irritado";
      } else if (detections[0].expressions["disgusted"] >= 0.25) {
        questionEmotions[currentIndex] = "Aborrecido";
      } else if (detections[0].expressions["fearful"] >= 0.25) {
        questionEmotions[currentIndex] = "Assustado";
      } else if (detections[0].expressions["sad"] >= 0.25) {
        questionEmotions[currentIndex] = "Triste";
      } else if (detections[0].expressions["surprised"] >= 0.25) {
        questionEmotions[currentIndex] = "Surpreso";
      }

      // Add this code to exclude "neutral" if it's not predominant
      if (emotionCounts["neutral"] > questionEmotions.length / 2) {
        delete emotionCounts["neutral"];
      }
    },
    100,
    { once: true }
  );
});

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function startQuiz() {
  contentlogin.style.display = "none";
  content.style.display = "flex";
  name = document.getElementById("name-input").value;
  console.log(name);
}

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  // Calculate and store the time spent on the current question
  const currentTime = new Date();
  const timeSpent = (currentTime - questionStartTime) / 1000; // Convert to seconds
  questionTimes.push(timeSpent);

  // Determine the predominant emotion for the current question
  const emotionCounts = {}; // Reset emotionCounts for each question
  questionEmotions.forEach((emotion, index) => {
    if (index <= currentIndex) {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    }
  });

  const predominantEmotion = Object.keys(emotionCounts).reduce((a, b) =>
    emotionCounts[a] > emotionCounts[b] ? a : b
  );

  predominantEmotions.push(predominantEmotion);

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;

  // Clear any previous content in the questionResults div
  const questionResultsDiv = document.getElementById("questionResults");
  questionResultsDiv.innerHTML = "";

  // Iterate through the questions and display time spent and predominant emotion for each
  for (let i = 0; i < questions.length; i++) {
    const questionResult = document.createElement("div");
    questionResult.innerHTML = `Questão ${i + 1}: Tempo gasto - ${
      questionTimes[i]
    } segundos, Emoção predominante - ${predominantEmotions[i]}`;
    questionResultsDiv.appendChild(questionResult);
  }

  content.style.display = "none";
  contentFinish.style.display = "flex";
  insertData();
}

function loadQuestion() {
  spnImg.innerHTML = "";
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;

  // Record the start time when a question is loaded
  questionStartTime = new Date();

  const imgElement = document.createElement("img");
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;
  imgElement.src = item.img;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  spnImg.appendChild(imgElement);

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
