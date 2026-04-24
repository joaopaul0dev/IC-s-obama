const personagens = [
  { nome: "Carol", img: "https://img.icons8.com/emoji/96/girl-emoji.png" },
  { nome: "Dennys, o Pimentinha", img: "https://img.icons8.com/emoji/96/boy-light-skin-tone.png" }
];

const operacoesPossiveis = [
  { tipo: "credito", descricao: "Recebeu mesada 💸", valor: 80 },
  { tipo: "credito", descricao: "Ganhou de presente 🎁", valor: 100 },
  { tipo: "credito", descricao: "Vendeu figurinhas 📱", valor: 50 },
  { tipo: "credito", descricao: "Achou dinheiro na mochila 💵", valor: 30 },
  { tipo: "debito", descricao: "Comprou um jogo 🎮", valor: -70 },
  { tipo: "debito", descricao: "Pagou a internet 🌐", valor: -40 },
  { tipo: "debito", descricao: "Gastou no shopping 🛍️", valor: -60 },
  { tipo: "debito", descricao: "Doou para caridade ❤️", valor: -25 }
];

let personagemSelecionado = null;
let saldoInicial = 0;
let saldoFinalCorreto = 0;

// Event listeners
document.getElementById('btn-iniciar').addEventListener('click', escolherPersonagem);
document.querySelectorAll('.personagem-option').forEach(option => {
  option.addEventListener('click', function(e) {
    personagemSelecionado = this.dataset.personagem;
    iniciarDesafio();
  });
});

const btnJogarNovamente = document.getElementById('btn-jogar-novamente');
if (btnJogarNovamente) {
  btnJogarNovamente.addEventListener('click', reiniciarJogo);
}

function escolherPersonagem() {
  document.getElementById('tela-inicial').style.display = 'none';
  document.getElementById('selecao-personagem').style.display = 'block';
}

function iniciarDesafio() {
  document.getElementById('selecao-personagem').style.display = 'none';
  document.getElementById('jogo').style.display = 'block';

  const personagem = personagens.find(p => p.nome === personagemSelecionado);
  if (!personagem) {
    alert('Erro: Personagem não encontrado!');
    return;
  }
  
  saldoInicial = Math.floor(Math.random() * 51) + 50; // saldo inicial entre 50 e 100
  saldoFinalCorreto = saldoInicial;

  const container = document.getElementById('jogo');
  container.innerHTML = `
    <h2>Desafio de ${personagem.nome}</h2>
    <div class="personagem">
      <img src="${personagem.img}" alt="${personagem.nome}">
      <p><strong>${personagem.nome}</strong> precisa calcular seu saldo bancário!</p>
    </div>
    <div class="total-final">
      <p>💰 Saldo inicial: R$ ${saldoInicial}</p>
    </div>
  `;

  // Embaralhar e selecionar 4 operações
  const operacoes = embaralhar([...operacoesPossiveis]).slice(0, 4);

  operacoes.forEach((op, index) => {
    saldoFinalCorreto += op.valor;
    const divOp = document.createElement('div');
    divOp.className = `operacao ${op.tipo}`;
    divOp.innerHTML = `
      <p><strong>${op.descricao}</strong></p>
      <p>Valor: R$ ${op.valor > 0 ? '+' : ''}${op.valor}</p>
    `;
    container.appendChild(divOp);
  });

  // Adicionar campo para resposta
  const divResposta = document.createElement('div');
  divResposta.className = 'total-final';
  divResposta.innerHTML = `
    <label for="resposta">Saldo final após todas as operações: R$ </label>
    <input type="number" id="resposta">
    <button class="btn" onclick="verificarResposta()">Verificar Resposta</button>
    <p class="result" id="resultado"></p>
  `;
  container.appendChild(divResposta);
}

function verificarResposta() {
  const resposta = parseInt(document.getElementById('resposta').value);
  const resultado = document.getElementById('resultado');
  if (resposta === saldoFinalCorreto) {
    // Esconder o jogo e mostrar tela de vitória
    document.getElementById('jogo').style.display = 'none';
    document.getElementById('tela-vitoria').style.display = 'block';
  } else {
    resultado.textContent = `❌ Ops! O saldo correto é R$ ${saldoFinalCorreto}. Tente novamente!`;
    resultado.style.color = "red";
  }
}

function reiniciarJogo() {
  // Resetar variáveis
  personagemSelecionado = null;
  saldoInicial = 0;
  saldoFinalCorreto = 0;

  // Esconder todas as telas e mostrar tela inicial
  document.getElementById('tela-vitoria').style.display = 'none';
  document.getElementById('selecao-personagem').style.display = 'none';
  document.getElementById('jogo').style.display = 'none';
  document.getElementById('tela-inicial').style.display = 'block';
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}
