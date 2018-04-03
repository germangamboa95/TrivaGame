console.log("Hello World");

//Construct current quiz object



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

    $(".title").text(quiz.title);


    // UI highlight
    $('.list-group').on('click','li', selector);

    // Next btn
    $('#btn').on('click', function(){
        quiz.nextQuestion(selection);

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
