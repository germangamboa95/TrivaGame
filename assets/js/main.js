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
    this.currentQuestion = data.questions[0];
  }

  checkAnswer(input) {
    const res =this.questions[this.questionCounter].answer == input;
    this._updateCounters(res);
    return res;
  }

  _updateCounters(res) {
    if (res) {
      this.right++;
    } else {
      this.wrong++;
    }

    this.questionCounter++;
  }
  _endQuiz(){

      let obj = {
        correct: this.right,
        wrong: this.wrong,
        percent: this.right/this.quizLength
      };
      return obj;
  }
  nextQuestion() {
      if(this.questionCounter == this.quizLength) {
          return this._endQuiz();
      } else {
        this.currentQuestion = this.questions[this.questionCounter];
      }
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

    let x = quiz.nextQuestion();

    $(".title").text(quiz.title);

    updateUi();


    $('.list-group').on('click','li', selector);

    $('#btn').on('click', function(){
        let check = quiz.checkAnswer(selection.attributes.value.value);
        let results = quiz.nextQuestion();
        if(results) {
            dispResults(results);
        } else {
            updateUi();
        }
    });





    //UI functions below
    function dispResults(res) {
        console.log(res);
        let markup = `
            <ul class="list-group py-2">
            <li  class="list-group-item"> You answered ${res.correct} questions correctly</li>
            <li  class="list-group-item"> You answered ${res.wrong} questions incorrectly</li>
            <li  class="list-group-item"> Your score is: ${res.percent * 100}% </li>
            </ul>
        `;
        $('.card-text').html(markup);
    }
    function selector() {
        (selection)? selection.classList.remove('selected'): null;
        selection = this;
        selection.classList.add('selected');
     }

    function updateUi() {
        $('.counter').text(`${quiz.questionCounter + 1} of ${quiz.quizLength}`);
        $('.list-group').html(' ');
        $(".question").text(quiz.currentQuestion.question_string);
        for (let i in quiz.currentQuestion.options) {
          let option = quiz.currentQuestion.options[i];
          $(".list-group").append(
            `<li value="${i}" class="list-group-item">${i}: ${option}</li>`
          );
        }
      }

  }

};
