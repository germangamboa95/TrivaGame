console.log("Hello World");

//Construct current quiz object

class Quiz {
  constructor(data) {
    this.title = data.name;
    this.timeLimit = data.time;
    this.questions = data.questions;
    this.quizLength = data.questions.length;
    this.wrong = 0;
    this.right = 0;
    this.questionCounter = 0;
    this.currentQuestion = -1;
  }

  checkAnswer(input) {
    return this.questions[this.questionCounter].answer == input;
  }

  updateCounters(res) {
    if (res) {
      this.right++;
    } else {
      this.wrong++;
    }

    this.questionCounter++;
  }

  nextQuestion() {
    this.currentQuestion = this.questionCounter + 1 ;
  }

  //Test function
  dataDump() {
    console.log(this.wrong + " " + this.right);
  }
}

window.onload = () => {
  // Import data
  fetch("game.json")
    .then(res => res.json())
    .then(res => appCtrl(res));

  //Controller function???
  function appCtrl(data) {
    let selection;
    const quiz = new Quiz(data);

    quiz.nextQuestion();

    // EWWWWWWWWW
    $(".title").text(quiz.title);
    $(".question").text(quiz.questions[0].question_string);
    for (let i in quiz.questions[0].options) {
      let option = quiz.questions[0].options[i];
      $(".list-group").append(
        `<li value="${i}" class="list-group-item">${i}: ${option}</li>`
      );
    }

    $('.list-group').on('click','li', function() {
       (selection)? selection.classList.remove('selected'): null;
       selection = this;
       selection.classList.add('selected');
    });

    $('#btn').on('click', function(){
        console.log(selection.attributes.value.value);
        let check = quiz.checkAnswer(selection.attributes.value.value);
        console.log(check);
    });





  }
};
