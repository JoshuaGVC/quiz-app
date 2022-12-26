const ul = document.querySelector('.quiz__body__list');
const countQuestion = document.querySelector(".quiz__count-question");
const countScore = document.querySelector(".quiz__count-score");
const buttonRestart = document.querySelector(".quiz__wrapper-result__button");
const firstContent = document.querySelector(".quiz__content");
const secondContent = document.querySelector(".quiz__body2");

let index = 0;
let puntos = 0;

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const questions = [
  {
    title: '¿Quien campeonó el mundial Qatar 2022',
    options: ['Qatar', 'Brasil', 'Argentina', 'Francia'],
    answer: 2
  },
  {
    title: '¿Que super heroe es debil a la kriptonita?',
    options: ['Shazam!', 'Flash', 'Linterna Verde', 'Batman', 'Superman'],
    answer: 4
  },
  {
    title: '¿Que super heroe es verde y tiene super fuerza?',
    options: ['loki', 'Arrow', 'Linterna verde', 'Spiderman', 'Hulk'],
    answer: 4
  },
  {
    title: '¿Cual es el unico lenguaje de estilo lee el navegador?',
    options: ['Boostrap', 'Material UI', 'SCSS', 'CSS', 'Styled Components'],
    answer: 3
  },
  {
    title: '¿Que es react',
    options: ['Framework', 'Libreria', 'lenguaje', 'Compilador', 'Etiqueta'],
    answer: 1
  },

  {
    title: '¿Como creas un espaciado de lineas en CSS?',
    options: ['Margin', 'Background', 'Color', 'font-size', 'width'],
    answer: 0
  },
  {
    title: '¿Cual es la etiqueta que hace referencia al titulo principal?',
    options: ['p', 'h2', 'h3', 'span', 'h1'],
    answer: 4
  },
  {
    title: '¿Cual es la etiqueta que se usa para hacer un inpervinculo?',
    options: ['a', 'strong', 'p', 'button', 'form'],
    answer: 0
  },
  {
    title: '¿Cual de estas opciones, sí es una etiqueta?',
    options: ['font-size', 'document.querySelectorAll', 'section', 'color', 'background-color'],
    answer: 2
  },
  {
    title: '¿Cual es la etiqueta que hace referencia al pie de pagina en el HTML?',
    options: ['a', 'H1', 'Header', 'footer', 'Main'],
    answer: 3
  },
].map( item => {
  return {
    title: item.title,
    options: item.options.map((option, index) => {
      return {
        title: option,
        id: uuidv4(),
        correct: item.answer === index
      }
    })
  }
});

function setTitle ( index ) {
  const h2 = document.querySelector('.quiz__body__title');
  h2.textContent = questions[ index ].title;
};

function setButton (item) {
  const li = document.createElement('li');
  li.classList.add('quiz__body__item');
  li.innerHTML = `
    <button class="quiz__body__ibutton quiz__button" onclick="answer(event)" id="${item.id}">${item.title}</button>
  `;
  ul.appendChild(li);
};

function setButtons (i) {
  ul.innerHTML = "";
  questions[i].options.forEach(item => {
    setButton(item);
  })
};

function buttonsDisabled () {
  const buttons = document.querySelectorAll(".quiz__body__ibutton");
  buttons.forEach(button =>{
    button.disabled = true;
  })
};

function colorButton (button, isCorrect) {
  const addClass = isCorrect ? "quiz__body__ibutton--correct" : "quiz__body__ibutton--fail";
  button.classList.add(addClass)
};

function answerCorrect (){
  const correct = questions[index].options.find(item =>{
    return item.correct;
  });
  return correct
};

const render = ()=> {
  const questionLength = questions.length;
  if(index < questionLength){
    updateCountQuestion();
    setTitle(index);
    setButtons(index);
  }else {
    firstContent.classList.add("u-none");
    secondContent.classList.remove("u-none");
    scoreFinal();
  }
};

function scoreFinal(){
  const scorefinal = document.querySelector(".quiz__wrapper-result__score");
  scorefinal.textContent = puntos;
};

function score(){
  countScore.textContent = puntos;
};

function updateCountQuestion(){
  countQuestion.textContent = `${index + 1}/${questions.length}`;
};

function answer (event) {
  const target = event.target;
  const objet = answerCorrect();
  const isCorrect = target.id === objet.id;
  if(isCorrect){
    puntos += 100;
    score();
  };
  buttonsDisabled();
  colorButton(target, isCorrect);
  index += 1;
  setTimeout(render, 1500);
};

function restart () {
  secondContent.classList.add("u-none");
  firstContent.classList.remove("u-none");
  puntos = 0;
  score();
  index = 0;
  render();
};

render();












