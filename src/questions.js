export default [
  {
    question: "Qual é o maior mamifero do mundo?",
    answers: [
      { option: "Elefante Africano", correct: false },
      { option: "Baleia Azul", correct: true },
      { option: "Girafa", correct: false },
      { option: "Hipopótamo", correct: false },
    ],
    img: "./public/img/mammals.jpg",
  },
  {
    question: 'Quem escreveu a peça "Romeu e Julieta"?',
    answers: [
      { option: "Charles Dickens", correct: false },
      { option: "William Shakespeare", correct: true },
      { option: "Jane Austen", correct: false },
      { option: "Mark Twain", correct: false },
    ],
    img: `https://picsum.photos/id/${Math.floor(Math.random() * 111)}/800/600`,
  },
  {
    question: "Qual o simbolo na tabela periódica do Ouro?",
    answers: [
      { option: "Go", correct: false },
      { option: "Gd", correct: false },
      { option: "Au", correct: true },
      { option: "Ag", correct: false },
    ],
    img: `https://picsum.photos/id/${Math.floor(Math.random() * 111)}/800/600`,
  },
  {
    question: "Qual pais é conhecido como Terra do sol nascente",
    answers: [
      { option: "China", correct: false },
      { option: "Coreia do Sul", correct: false },
      { option: "Japão", correct: true },
      { option: "Tailândia", correct: false },
    ],
    img: `https://picsum.photos/id/${Math.floor(Math.random() * 111)}/800/600`,
  },
  {
    question:
      "Qual cientista famoso é responsavel pela teoria da relatividade?",
    answers: [
      { option: "Isaac Newton", correct: false },
      { option: "Albert Einstein", correct: true },
      { option: "Galileo Galilei", correct: false },
      { option: "Stephen Hawking", correct: false },
    ],
    img: `https://picsum.photos/id/${Math.floor(Math.random() * 111)}/800/600`,
  },
  {
    question: "Qual é o maior planeta do nosso sistema solar?",
    answers: [
      { option: "Venus", correct: false },
      { option: "Marte", correct: false },
      { option: "Jupiter", correct: true },
      { option: "Saturno", correct: false },
    ],
    img: `https://picsum.photos/id/${Math.floor(Math.random() * 111)}/800/600`,
  },
];
