// Elements
const startBtn = document.querySelector('#startBtn');
const nextBtn = document.querySelector('#nextBtn');
const introSection = document.querySelector('#intro');
const quizSections = document.querySelectorAll('.quiz');
const body = document.querySelector('body');

// const quiz1 = document.querySelector('.quiz-1');
// const nextBtn1 = document.querySelector('#nextBtn1');
// const quiz2 = document.querySelector('.quiz-2');
// const nextBtn2 = document.querySelector('#nextBtn2');

// Variables
const quizzes = [];
let quizOrder = {
  num: 0,
};

// Functions
const monitorStartBtn = () => {
  startBtn.addEventListener('mouseover', () => {
    startBtn.classList.remove('intro__btn_shake');
  });

  startBtn.addEventListener('mouseout', () => {
    startBtn.classList.add('intro__btn_shake');
  });
};

const initQuizzes = () => {
  quizSections.forEach((quiz) => {
    quizzes.push(quiz);
    quiz.classList.add('hide');
  });

  quizOrder.curr = quizOrder.num;
  quizOrder.next = quizOrder.num + 1;
};

const animateElement = (element, animation) => {
  body.style.height = '100vh';
  element.classList.add(animation);
  element.addEventListener(
    'animationend',
    () => {
      element.classList.remove(animation);
      body.style.height = 'auto';
    },
    { once: true }
  );
};

const swapElement = (outElement, inElement) => {
  outElement.addEventListener('animationend', () => {
    outElement.classList.add('hide');
    inElement.classList.remove('hide');
  });
};

const showNextQuiz = (curr, next) => {
  animateElement(curr, 'quiz_hide');
  swapElement(curr, next);
  animateElement(next, 'quiz_show');
};

initQuizzes();
monitorStartBtn();

// Events
// startBtn.addEventListener('click', () => {
//   animateElement(introSection, 'intro_hide');
//   swapElement(introSection, quizzes[quizOrder.curr]);
//   animateElement(quizzes[quizOrder.curr], 'quiz_show');
//   nextBtn.classList.remove('hide');
// });

nextBtn.addEventListener('click', () => {
  if (quizOrder.num < quizzes.length - 1) {
    quizOrder.num++;
    showNextQuiz(quizzes[quizOrder.curr], quizzes[quizOrder.next]);
  }
  if (quizOrder.num == quizzes.length - 1) nextBtn.classList.add('hide');
});