window.onload = () => {

//Quiz selector
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

  // Import data
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
