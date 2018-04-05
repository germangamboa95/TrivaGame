window.onload = () => {

//This bootstraps the app into loading the  selected quiz when a user selects one.
  $('a').on('click', function(){
    let quiz = this.attributes.value.value;
    fetch('htmlComponent/quiz.html')
    .then(res => res.text())
    .then(data => {
      $('.fake-body').html(data);
       fetch(quiz)
      .then(res => res.json())
      .then(res => appCtrl(res));
    });
  });

  // Control the main app from here.
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

    //UI Answer select function
    function selector() {
        (selection)? selection.classList.remove('selected'): null;
        selection = this;
        selection.classList.add('selected');
     }
  }
};
