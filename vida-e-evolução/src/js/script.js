const totalCasas = 22;
let casas = [];
let jogadorAtual = 1;
let proximaCasa = 0;
let jogadaEmAndamento = false;
let numJogadores = 2;

const coresJogador = {
    1: 'jogador-color-1',
    2: 'jogador-color-2',
    3: 'jogador-color-3',
    4: 'jogador-color-4'
};

function criarTabuleiro() {
    const tabuleiro = document.getElementById('tabuleiro');
    if (!tabuleiro) return;

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
    atualizarStatus('Escolha quantas correntes pintar (1 a 4).');
}

function atualizarMensagem() {
    const info = document.getElementById('info-jogador');
    if (info) {
        info.textContent = `Vez do Jogador ${jogadorAtual}`;
        info.style.color = jogadorAtual <= 4 ? '' : '';
    }
}

function atualizarBotoes() {
    const botoes = document.querySelectorAll('.botao-jogada');
    const cor = jogadorAtual <= 4 ? getComputedStyle(document.documentElement).getPropertyValue('--') : '';
    botoes.forEach(btn => {
        btn.style.backgroundColor = ''; // style reset. 
        btn.disabled = jogadaEmAndamento;
        const playerColor = getColorDoJogador(jogadorAtual);
        btn.style.border = `2px solid ${playerColor}`;
    });
}

function getColorDoJogador(jogador) {
    const map = {
        1: '#2174e3',
        2: '#e32639',
        3: '#f4b500',
        4: '#2b8f51'
    };
    return map[jogador] || '#000';
}

function selecionarNumJogadores(value) {
    numJogadores = Number(value);
    document.getElementById('num-jogadores-label').textContent = `Jogadores: ${numJogadores}`;
    criarTabuleiro();
}

function desenharTabuleiroEstilo() {
    const tab = document.getElementById('tabuleiro');
    if (!tab) return;
    tab.style.width = totalCasas <= 22 ? '660px' : '100%';
}

function jogar(qtde) {
    if (jogadaEmAndamento) {
        atualizarStatus('Ainda em andamento. Aguarde a animação terminar.');
        return;
    }

    const restante = totalCasas - proximaCasa;
    const maximo = Math.min(4, restante);
    const escolhidas = Math.max(1, Math.min(qtde, maximo));

    if (escolhidas <= 0) {
        atualizarStatus('Número de correntes inválido. Escolha entre 1 e 4.');
        return;
    }

    jogadaEmAndamento = true;
    const corClasse = coresJogador[jogadorAtual];
    let casasRestantes = escolhidas;

    atualizarStatus(`Jogador ${jogadorAtual} pintará ${escolhidas} corrente(s).`);

    const animar = () => {
        if (casasRestantes === 0) {
            if (proximaCasa === totalCasas) {
                const perdedor = jogadorAtual;
                const vencedor = jogadorAtual % numJogadores + 1;
                atualizarStatus(`🎉 Jogador ${vencedor} venceu! Jogador ${perdedor} perdeu.`);
                setTimeout(() => {
                    alert(`Jogador ${vencedor} venceu! Jogador ${perdedor} perdeu.`);
                    reiniciarJogo();
                }, 300);
            } else {
                jogadorAtual = jogadorAtual % numJogadores + 1;
                jogadaEmAndamento = false;
                atualizarMensagem();
                atualizarBotoes();
                atualizarStatus(`É a vez do Jogador ${jogadorAtual}.`);
            }
            return;
        }

        casas[proximaCasa].classList.add(corClasse);
        proximaCasa++;
        casasRestantes--;
        setTimeout(animar, 180);
    };

    atualizarBotoes();
    animar();
}

function reiniciarJogo() {
    criarTabuleiro();
    atualizarStatus('Jogo reiniciado. Boa sorte!');
}

function atualizarStatus(text) {
    const status = document.getElementById('status-jogo');
    if (status) status.textContent = text;
}

if (document.getElementById('selecionar-jogadores')) {
    document.addEventListener('DOMContentLoaded', () => {
        criarTabuleiro();
        desenharTabuleiroEstilo();
    });
}
