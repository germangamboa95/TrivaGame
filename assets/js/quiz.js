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
    this.updateUi();
  }

  timerCountDown() {
    this.timerData = setInterval(() => {
      this.timeLeft -= 1000;
      console.log(this.timeLeft);
      $('.timer').text(this.timeLeft / 1000 + ' Seconds Remain' );
      if(this.timeLeft < 0) {
        let res = this._endQuiz();
        this.dispResults(res, true);
      }
    }, 1000);
  }

  checkAnswer(input) {
    const res = this.questions[this.questionCounter].answer === input;
    console.log(input,' ', res);
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
    this.gihpy(obj);
    return obj;
  }

  nextQuestion(selection) {

    let select = selection? selection.attributes.value.value : false;

    this.checkAnswer(select);

    if (this.questionCounter > this.quizLength -1) {

      let res = this._endQuiz();

      this.dispResults(res);

    } else {

      this.currentQuestion = this.questions[this.questionCounter];

      this.updateUi();
    }
    
    return null;
  }

  updateUi() {
    $(".counter").text(`${this.questionCounter +1 } of ${this.quizLength}`);
    $(".list-group").html(" ");
    $(".question").text(this.currentQuestion.question_string);
    for (let i in this.currentQuestion.options) {
      let option = this.currentQuestion.options[i];
      $(".list-group").append(
        `<li value="${i}" class="list-group-item">${i}: ${option}</li>`
      );
    }
  }

  dispResults(res, flag = false) {
    console.log(res);
    let markup = `
          <ul class="list-group text-center py-2">
          <li  class="py-2"> You answered ${
            res.correct
          } questions correctly</li>
          <li  class="py-2"> You answered ${
            res.wrong
          } questions incorrectly</li>
          <li  class="py-2"> Your score is: ${res.percent *
            100}% </li>
          </ul>
      `;
    if(flag) $(".card-text").before('<h2  class="alert alert-danger text-center" role="alert">You ran out of time!</h2>');  

    $(".card-text").html(markup);
  }

  gihpy(res){
    let query;
    if(res.percent == 0){
      query = 'failure';
    } else if(res.percent == 1){
      query = 'awesome';
    } else if(res.percent >= .5 && res.percent < .6) {
      query = 'depression';
    } else if(res.percent > 0 && res.percent < .1) {
      query = 'boo';
    } else if(res.percent >= .1 && res.percent < .2) {
      query = 'cries';
    } else if(res.percent >= .3 && res.percent < .4) {
      query = 'damn';
    } else if(res.percent >= .6 && res.percent < .7) {
      query = 'meh';
    } else if(res.percent >= .7 && res.percent < .8) {
      query = 'alright';
    } else if(res.percent >= .8 && res.percent < .9) {
      query = 'YES!';
    } else if(res.percent >= .9 && res.percent < 1) {
      query = 'win';
    }

    fetch('https://api.giphy.com/v1/gifs/search?api_key=YqLensbIWv5skyGVSr6ZPFClfQImMmX4&q='+query+'&limit=10&offset=0&rating=R&lang=en')
      .then(res => res.json())
      .then(data => this.addPic(data));
  }

  addPic(data) {
    console.log(data);
    let rand = Math.floor(Math.random() * 10);
    $(".card-text").append(`<img class="mx-auto d-block pb-3 img-fluid" src="${data.data[rand].images.downsized_medium.url}">`);
  }

}
