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
  }