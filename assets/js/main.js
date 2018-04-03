window.onload = () => {
  // Import data
  fetch("strange.json")
    .then(res => res.json())
    .then(res => appCtrl(res));

  function appCtrl(data) {
      
    let selection;

    const quiz = new Quiz(data);


    //Quiz Name 
    $(".title").text(quiz.title);

    // UI highlight
    $('.list-group').on('click','li', selector);
   

    // Next btn
    $('#btn').on('click', function(){

        selection = quiz.nextQuestion(selection);
    

    });

    //UI helper function'
    function selector() {
        (selection)? selection.classList.remove('selected'): null;
        selection = this;
        selection.classList.add('selected');
     }
  }
};
