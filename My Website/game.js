  const question = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const progressText = document.getElementById("progressText");
  const scoreText = document.getElementById("score");
  const progressBarFull = document.getElementById("progressBarFull");
  let currentQuestion = {};
  let acceptingAnswers = false;
  let score = 0;
  let questionCounter = 0;
  let availableQuesions = [];

  let questions = [
    
      {
        "question": "Do want to read fiction or non-fiction?",
        "choice1": "Fiction",
        "choice2": "Non-fiction",   
       
      },
      {
        "question": "Do you feel like you are not in control of the way people percieve you?",
        "choice1": "Yes",
        "choice2": "No",
        "choice3": "<script src='xxx.js'>",
        "choice4": "<script file='xxx.js'>",
        "answer": 1
      },
      {
        "question": "Do you feel like the people around you slowly start to despise you?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },
      {
        "question": "Do you feel like everyone is watching you?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },
      {
        "question": "Do you feel like you can achieve things no one else can?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      } ,  
      {
        "question": "Do you believe being rich will solve all of your problems?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },
      {
        "question": "Do you feel like you cannot find like-minded people wherever you go?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },
      {
        "question": "Do you struggle to express yourself?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      }   , {
        "question": "Do you struggle from getting up in the morning?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      }   , {
        "question": "Do you hate who you were in the past?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      }   , {
        "question": "Do you hurt people emotionally by accident?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      }  , {
        "question": "Do you feel like you need to work harder?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      } ,   {
        "question": "Do you believe in god?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },
      {
        "question": "Did you mistakenly believe you were somebody else in the past?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },   
      {
        "question": "Do you believe in yourself?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      }   , {
        "question": "Do you believe there is one book, one sentence, one piece of advice that is exactly what you need right now?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },
      {
        "question": "Do you find yourself trying to improve yourself but picking up wrong habits in the process?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do you feel like there is much more to life than what people expect you to settle with?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do you believe that you can achieve anything if you put your mind to it?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do you truly appreciate your parents for every nuance of care they provide?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do you want to have a conversation with one of the greatest men in history?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do you believe you are talented?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do you follow the ideologies of stoicism?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do you need to be set on the right path?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do want to be the greatest of all time?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      },    {
        "question": "Do you want to help other's?",
        "choice1": "Yes",
        "choice2": "No",
        "answer": 1
      }
    ];


  
  //CONSTANTS
  const CORRECT_BONUS = 0;
  const MAX_QUESTIONS = 26;

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
  };

  getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
      //go to the end page
      return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };

  choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 200);
    });
  });

  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

  startGame();