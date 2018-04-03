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
    this.timer = data.time;
    this.timeLeft = this.timer;
    this.timerCountDown();
    this.timerData;
  }

  timerCountDown() {
    this.timerData = setInterval(() => {
      this.timeLeft -= 1000;
      console.log(this.timeLeft);
      this.timeLeft <= 0 ? this._endQuiz() : null;
    }, 1000);
  }

  checkAnswer(input) {
    const res = this.questions[this.questionCounter].answer == input;
    console.log(res);
    this._updateCounters(res);
    return res;
  }

  _updateCounters(res) {
    res ? this.right++ : this.wrong++;
    this.questionCounter++;
  }
  _endQuiz() {
    let obj = {
      correct: this.right,
      wrong: this.wrong,
      percent: this.right / this.quizLength
    };
    clearTimeout(this.timerData);
    return obj;
  }

  nextQuestion(selection) {
    let select;
    selection ? console.log((select = selection.attributes.value.value)) : null;

    if (this.questionCounter == this.quizLength) {
      let res = this._endQuiz();
      this.dispResults(res);
    } else {
      this.checkAnswer(select);
      this.updateUi();
      this.currentQuestion = this.questions[this.questionCounter];
    }
    
  }

  updateUi() {
    $(".counter").text(`${this.questionCounter} of ${this.quizLength}`);
    $(".list-group").html(" ");
    $(".question").text(this.currentQuestion.question_string);
    for (let i in this.currentQuestion.options) {
      let option = this.currentQuestion.options[i];
      $(".list-group").append(
        `<li value="${i}" class="list-group-item">${i}: ${option}</li>`
      );
    }
  }

  dispResults(res) {
    console.log(res);
    let markup = `
          <ul class="list-group py-2">
          <li  class="list-group-item"> You answered ${
            res.correct
          } questions correctly</li>
          <li  class="list-group-item"> You answered ${
            res.wrong
          } questions incorrectly</li>
          <li  class="list-group-item"> Your score is: ${res.percent *
            100}% </li>
          </ul>
      `;
    $(".card-text").html(markup);
  }
}
