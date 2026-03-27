const totalCasas = 22;
let casas = [];
let jogadorAtual = 1;
let proximaCasa = 0;
let jogadaEmAndamento = false;

function iniciarJogo() {
    document.getElementById('tela-inicial').classList.remove('visivel');
    document.getElementById('tela-jogo').classList.add('visivel');
    criarTabuleiro();
    atualizarBotoes();
}

function criarTabuleiro() {
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';
    casas = [];

    for (let i = 0; i < totalCasas; i++) {
        const casa = document.createElement('div');
        casa.classList.add('casa');
        casas.push(casa);
        tabuleiro.appendChild(casa);
    }

    jogadorAtual = 1;
    proximaCasa = 0;
    jogadaEmAndamento = false;
    atualizarMensagem();
    atualizarBotoes();
}

function atualizarMensagem() {
    document.getElementById('info-jogador').textContent = `Vez do Jogador ${jogadorAtual}`;
}

function atualizarBotoes() {
    const botoes = document.querySelectorAll('.botao-jogada');
    const cor = jogadorAtual === 1 ? '#2196F3' : '#f44336';
    botoes.forEach(btn => {
        btn.style.backgroundColor = cor;
        btn.disabled = jogadaEmAndamento;
    });
}

function jogar(qtde) {
    if (jogadaEmAndamento || proximaCasa + qtde > totalCasas) {
        alert("Jogada inválida ou ainda em andamento.");
        return;
    }

    jogadaEmAndamento = true;
    const corClasse = jogadorAtual === 1 ? 'jogador1' : 'jogador2';

    let casasRestantes = qtde;
    let delay = 0;

    const animar = () => {
        if (casasRestantes === 0) {
            if (proximaCasa === totalCasas) {
                const perdedor = jogadorAtual;
                const vencedor = jogadorAtual === 1 ? 2 : 1;
                setTimeout(() => {
                    alert(`Jogador ${vencedor} venceu! Jogador ${perdedor} perdeu.`);
                    reiniciarJogo();
                }, 300);
            } else {
                jogadorAtual = jogadorAtual === 1 ? 2 : 1;
                jogadaEmAndamento = false;
                atualizarMensagem();
                atualizarBotoes();
            }
            return;
        }

        casas[proximaCasa].classList.add(corClasse);
        proximaCasa++;
        casasRestantes--;
        setTimeout(animar, 200);
    };

    atualizarBotoes();
    animar();
}

function reiniciarJogo() {
    criarTabuleiro();
}