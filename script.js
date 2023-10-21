// Elements
const startBtn = document.querySelector('#startBtn');
const nextBtn = document.querySelector('#nextBtn');
const finishBtn = document.querySelector('#finishBtn');
const introSection = document.querySelector('#intro');
const quizSections = document.querySelectorAll('.quiz');
const resultSection = document.querySelector('.result');
const userResultDisplay = document.querySelector('#userResultDisplay');
const body = document.querySelector('body');

// Variables
const quizzes = [];
let quizOrder = {
  num: 0,
};
const quizAnswers = [1, 1, 2, 2, 3];
let currQuiz;
let currQuizType;
let currQuizAnswer;
let currQuizOption;
let currQuizOptions;
let currQuizForm;
let currQuizFormBtn;
let currQuizFormFeedback;
let userAnswer;
let score = 0;

// Functions
const monitorStartBtn = () => {
  startBtn.addEventListener('mouseover', () => {
    startBtn.classList.remove('intro__btn_shake');
  });

  startBtn.addEventListener('mouseout', () => {
    startBtn.classList.add('intro__btn_shake');
  });
};

const disableNextBtn = (state) => {
  nextBtn.disabled = state;
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

const setupQuiz = () => {
  currQuiz = quizzes[quizOrder.curr];
  currQuizType = currQuiz.getAttribute('data-type');
  currQuizAnswer = quizAnswers[quizOrder.curr];
  disableNextBtn(true);
  if (currQuizType === 'options') {
    currQuizOption = currQuiz.querySelector('.quiz__options');
    currQuizOptions = currQuiz.querySelectorAll('.quiz__option');
    verifyOption(currQuizOptions);
  }
  if (currQuizType === 'form') {
    currQuizForm = currQuiz.querySelector('.quiz__form');
    currQuizFormFeedback = currQuiz.querySelector('.quiz__form-feedback');
    verifyForm(currQuizForm);
  }
};

const verifyOption = (options) => {
  currQuizOption.addEventListener(
    'click',
    (e) => {
      userAnswer = e.target.getAttribute('data-index');
      options.forEach((option) => (option.disabled = true));
      disableNextBtn(false);
      if (Number(userAnswer) === currQuizAnswer) {
        e.target.classList.add('quiz__option_correct');
        score++;
      } else {
        e.target.classList.add('quiz__option_wrong');
      }
    },
    { once: true }
  );
};

const verifyForm = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    currQuizFormBtn = form.querySelector('.btn__submit');
    currQuizFormBtn.disabled = true;
    disableNextBtn(false);
    userAnswer = form.querySelector('.quiz__input').value;
    if (Number(userAnswer) === currQuizAnswer) {
      showFormFeedback('./images/form=correct.png');
      score++;
    } else {
      showFormFeedback('./images/form-error.png');
    }
  });
};

const showFormFeedback = (feedbackUrl) => {
  currQuizFormFeedback.classList.remove('hide');
  currQuizFormFeedback.setAttribute('src', feedbackUrl);
};

const monitorFinishBtn = () => {
  if (currQuizType === 'options') {
    currQuizOptions.forEach((option) => {
      option.addEventListener('click', () => {
        finishBtn.classList.remove('hide');
      });
    });
  }
  if (currQuizType === 'form') {
    currQuizForm.addEventListener('submit', () => {
      finishBtn.classList.remove('hide');
    });
  }
};

initQuizzes();
monitorStartBtn();

// Events
startBtn.addEventListener('click', () => {
  animateElement(introSection, 'intro_hide');
  swapElement(introSection, quizzes[quizOrder.curr]);
  animateElement(quizzes[quizOrder.curr], 'quiz_show');
  nextBtn.classList.remove('hide');
  setupQuiz();
});

nextBtn.addEventListener('click', () => {
  if (quizOrder.num < quizzes.length - 1) {
    quizOrder.num++;
    showNextQuiz(quizzes[quizOrder.curr], quizzes[quizOrder.next]);
    quizOrder.curr = quizOrder.num;
    quizOrder.next = quizOrder.num + 1;
    setupQuiz();
  }
  if (quizOrder.num == quizzes.length - 1) {
    nextBtn.classList.add('hide');
    monitorFinishBtn();
  }
});

finishBtn.addEventListener(
  'click',
  () => {
    currQuiz.classList.add('hide');
    resultSection.classList.remove('hide');
    finishBtn.disabled = true;
    finishBtn.classList.add('hide');
    userResultDisplay.textContent = score;
  },
  { once: true }
);
