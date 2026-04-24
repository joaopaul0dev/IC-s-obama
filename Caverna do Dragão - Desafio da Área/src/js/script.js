// Função para embaralhar arrays (Fisher-Yates shuffle)
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Texto da história inicial
const introTexts = [
  "Em um parque de diversão, os seis amigos da Caverna do Dragão formaram um grupo para entrar no último brinquedo: o observatório.",
  "Ao sair, perceberam uma movimentação estranha no parque. Olharam ao redor e não reconheceram o lugar.",
  "De repente, ouviram um barulho estranho, um rugido poderoso!",
  "Um dragão apareceu, imponente, fazendo todos correrem para se proteger.",
  "Enquanto fugiam, olharam para uma árvore e avistaram o Mestre dos Magos, que parecia ter uma mensagem importante.",
  "O Mestre dos Magos disse que eles teriam que ir até a <strong>Caverna da Matemática</strong> e salvar a donzela através da resolução das questões matemáticas envolvendo área.",
  "A caverna tinha 6 entradas, e todas deveriam ser resolvidas corretamente para que eles pudessem salvar a donzela."
];

// Funções para gerar perguntas dinâmicas e opções para cada entrada

function geraEntrada1() {
  // Retângulo: área = base * altura
  let base = getRandomInt(8, 15);
  let altura = getRandomInt(2, 7);
  let area = base * altura;
  // opções erradas coerentes
  let opts = generateOptions(area, [area * 1.2, area - 3, area + 5]);
  return {
    image: "https://i.imgur.com/tp9D6cn.jpg",
    title: "Entrada 1 - O Portão Retangular",
    question: `Qual é a área de um retângulo com ${base} metros de comprimento e ${altura} metros de largura?`,
    options: shuffleArray(opts),
    correctAnswer: area
  };
}

function geraEntrada2() {
  // Triângulo: área = (base * altura)/2
  let base = getRandomInt(8, 15);
  let altura = getRandomInt(4, 10);
  let area = (base * altura) / 2;
  area = Math.round(area * 10) / 10; // 1 casa decimal
  let opts = generateOptions(area, [area + 5, area - 2.5, area + 3.3]);
  return {
    image: "https://i.imgur.com/TKNmDyi.jpg",
    title: "Entrada 2 - A Porta Triangular",
    question: `Qual é a área de um triângulo com base ${base} metros e altura ${altura} metros?`,
    options: shuffleArray(opts),
    correctAnswer: area
  };
}

function geraEntrada3() {
  // Círculo: área = π * r² (π=3.14)
  let raio = getRandomInt(5, 10);
  let area = 3.14 * raio * raio;
  area = Math.round(area * 100) / 100; // 2 casas decimais
  let opts = generateOptions(area, [area - 15, area + 10, area - 7]);
  return {
    image: "https://i.imgur.com/3DzNsq7.jpg",
    title: "Entrada 3 - O Poço Circular",
    question: `Qual é a área da superfície de um círculo com raio ${raio} metros? (Use π ≈ 3,14)`,
    options: shuffleArray(opts),
    correctAnswer: area
  };
}

function geraEntrada4() {
  // Portal: retângulo + semicírculo
  // Retângulo 10m x 6m fixos, semicírculo raio 3m fixo
  let rectArea = 10 * 6;
  let semiCirculoArea = (3.14 * 3 * 3) / 2;
  let totalArea = rectArea + semiCirculoArea;
  totalArea = Math.round(totalArea * 100) / 100;
  let opts = generateOptions(totalArea, [totalArea + 8, totalArea - 10, totalArea + 3]);
  return {
    image: "https://i.imgur.com/8Y9vCKb.jpg",
    title: "Entrada 4 - O Portal Composto",
    question: `Um portal é formado por um retângulo de 10m x 6m com um semicírculo de raio 3m no topo. Qual é a área total aproximada?`,
    options: shuffleArray(opts),
    correctAnswer: totalArea
  };
}

function geraEntrada5() {
  // Trapézio: área = ((B + b) * h)/2
  let baseMaior = getRandomInt(6, 12);
  let baseMenor = getRandomInt(3, baseMaior - 1);
  let altura = getRandomInt(3, 7);
  let area = ((baseMaior + baseMenor) * altura) / 2;
  area = Math.round(area * 10) / 10;
  let opts = generateOptions(area, [area + 3, area - 2, area + 5]);
  return {
    image: "https://i.imgur.com/mzDQoXY.jpg",
    title: "Entrada 5 - O Baú do Trapézio",
    question: `Qual é a área de um trapézio com bases ${baseMaior}m e ${baseMenor}m e altura ${altura}m?`,
    options: shuffleArray(opts),
    correctAnswer: area
  };
}

function geraEntrada6() {
  // Hexágono: área = (3√3 × lado²)/2 , √3 ≈ 1,73
  let lado = getRandomInt(3, 6);
  let area = (3 * 1.73 * (lado * lado)) / 2;
  area = Math.round(area * 10) / 10;
  let opts = generateOptions(area, [area - 5, area + 4, area - 3]);
  return {
    image: "https://i.imgur.com/Jt18Mtf.jpg",
    title: "Entrada 6 - Plataforma Hexagonal",
    question: `Qual é a área aproximada de um hexágono regular com lado ${lado}m? (Área = (3√3 × lado²)/2 e √3 ≈ 1,73)`,
    options: shuffleArray(opts),
    correctAnswer: area
  };
}

// Gera opções embaralhadas com 1 correta + 3 erradas coerentes
function generateOptions(correct, wrongs) {
  // Formatando números para mostrar sempre com 1 ou 2 casas decimais e unidade
  let opts = [];
  function formatNum(n) {
    // Se inteiro, sem decimal, senão 1 ou 2 casas
    if (Number.isInteger(n)) return `${n} m²`;
    return `${n.toFixed(1).replace('.', ',')} m²`;
  }
  opts.push(formatNum(correct));
  wrongs.forEach(w => {
    // Garante que valores errados não sejam iguais à correta
    if (Math.abs(w - correct) < 0.1) w += 2;
    opts.push(formatNum(w));
  });
  return opts;
}

// Função para gerar int random entre min e max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Todas as entradas
const entradas = [
  geraEntrada1,
  geraEntrada2,
  geraEntrada3,
  geraEntrada4,
  geraEntrada5,
  geraEntrada6
];

// Estado do jogo
let currentIndex = 0;
let score = 0;
const contentDiv = document.getElementById('content');
const modalOverlay = document.getElementById('modalOverlay');
const btnRestart = document.getElementById('btnRestart');
const btnRetry = document.getElementById('btnRetry');

// Função para iniciar/reiniciar o jogo
function startGame() {
  currentIndex = 0;
  score = 0;
  modalOverlay.style.display = 'none';
  document.body.classList.remove('modal-open');
  showIntro(0);
}

// Mostrar introdução e depois começar as perguntas
function showIntro(i) {
  if (i >= introTexts.length) {
    showQuestion();
    return;
  }
  contentDiv.innerHTML = `<p class="story-text">${introTexts[i]}</p>
    <button id="btnNextIntro">Continuar</button>`;
  document.getElementById('btnNextIntro').addEventListener('click', () => showIntro(i + 1));
}

// Mostrar pergunta atual
function showQuestion() {
  if (currentIndex >= entradas.length) {
    showFinalScore();
    return;
  }
  let entradaAtual = entradas[currentIndex]();

  let html = `
      <div class="image-container">
        <img src="${entradaAtual.image}" alt="Imagem da ${entradaAtual.title}">
      </div>
      <h2>${entradaAtual.title}</h2>
      <p class="question">${entradaAtual.question}</p>
      <div class="options" role="list" aria-label="Opções de resposta">
        ${entradaAtual.options.map((opt, i) => `<button role="listitem" data-answer="${opt}">${opt}</button>`).join('')}
      </div>
      <div id="feedback" aria-live="polite"></div>
    `;
  contentDiv.innerHTML = html;

  const buttons = contentDiv.querySelectorAll('.options button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      checkAnswer(btn, entradaAtual.correctAnswer);
    });
  });
}

// Checar resposta
function checkAnswer(buttonClicked, correctAnswer) {
  const selected = buttonClicked.getAttribute('data-answer');
  const correctFormatted = formatCorrectAnswer(correctAnswer);

  // Desabilitar todas as opções para evitar múltiplos cliques
  contentDiv.querySelectorAll('.options button').forEach(b => b.disabled = true);

  if (selected === correctFormatted) {
    buttonClicked.classList.add('correct');
    document.getElementById('feedback').textContent = 'Muito bem! Resposta correta.';
    score++;
    // Passa para próxima pergunta após delay
    setTimeout(() => {
      currentIndex++;
      showQuestion();
    }, 1800);
  } else {
    buttonClicked.classList.add('wrong');
    document.getElementById('feedback').textContent = 'Ops! Resposta errada.';
    // Mostra modal para tentar ou reiniciar
    setTimeout(() => {
      showModal();
    }, 1200);
  }
}

function formatCorrectAnswer(num) {
  if (Number.isInteger(num)) return `${num} m²`;
  return `${num.toFixed(1).replace('.', ',')} m²`;
}

// Mostrar modal erro
function showModal() {
  modalOverlay.style.display = 'flex';
  document.body.classList.add('modal-open');
}

btnRestart.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
  document.body.classList.remove('modal-open');
  startGame();
});

btnRetry.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
  document.body.classList.remove('modal-open');
  showQuestion();
});

// Mostrar placar final
function showFinalScore() {
  contentDiv.innerHTML = `
      <h2>Parabéns!</h2>
      <p>Você conseguiu passar por todas as entradas da Caverna da Matemática.</p>
      <p id="score">Acertos: ${score} de ${entradas.length}</p>
      <button id="btnRestartEnd">Jogar Novamente</button>
    `;
  document.getElementById('btnRestartEnd').addEventListener('click', startGame);
}

// Iniciar jogo na primeira carga
startGame();