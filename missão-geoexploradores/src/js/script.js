 // Mostrar missões
    document.querySelectorAll('.mission-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const missionId = btn.getAttribute('data-mission');
        document.querySelectorAll('.mission-content').forEach(div => {
          div.style.display = 'none';
        });
        document.getElementById(missionId).style.display = 'block';
      });
    });

    // Missão 1
    function mission1Result(correct) {
      const feedback = document.getElementById('mission1-feedback');
      if (correct) {
        feedback.innerHTML = `<p class=""success"">✅ Correto! Uma lata é um cilindro.</p><button class=""next-btn"" onclick=""showNext('mission2')"">Ir para Missão 2</button>`;
      } else {
        feedback.innerHTML = `<p class=""error"">❌ Tente novamente.</p>`;
      }
    }

    // Missão 2
    function mission2Result(correct) {
      const feedback = document.getElementById('mission2-feedback');
      if (correct) {
        feedback.innerHTML = `<p class=""success"">✅ Correto! Um cubo tem 12 arestas.</p><button class=""next-btn"" onclick=""showNext('mission3')"">Ir para Missão 3</button>`;
      } else {
        feedback.innerHTML = `<p class=""error"">❌ Resposta incorreta.</p>`;
      }
    }

    // Mostrar próxima missão
    function showNext(id) {
      document.querySelectorAll('.mission-content').forEach(div => div.style.display = 'none');
      document.getElementById(id).style.display = 'block';
    }

    // Missão 3 - Robô
    const gridSize = 5;
    let robotPos = { x: 0, y: 0 };
    const goalPos = { x: 4, y: 4 };
    const grid = document.getElementById("grid");

    function renderGrid() {
      grid.innerHTML = '';
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          if (robotPos.x === x && robotPos.y === y) {
            cell.classList.add('robot');
            cell.textContent = '🤖';
          } else if (goalPos.x === x && goalPos.y === y) {
            cell.classList.add('goal');
            cell.textContent = '🏁';
          }
          grid.appendChild(cell);
        }
      }
    }

    function move(direction) {
      if (direction === 'up' && robotPos.y > 0) robotPos.y--;
      if (direction === 'down' && robotPos.y < gridSize - 1) robotPos.y++;
      if (direction === 'left' && robotPos.x > 0) robotPos.x--;
      if (direction === 'right' && robotPos.x < gridSize - 1) robotPos.x++;

      renderGrid();
      checkVictory();
    }

    function checkVictory() {
      const feedback = document.getElementById('mission3-feedback');
      if (robotPos.x === goalPos.x && robotPos.y === goalPos.y) {
        feedback.innerHTML = `<p class=""success"">🎉 Parabéns! Você completou todas as missões!</p>`;
      }
    }

    window.onload = renderGrid;
 