
function checkWin() {
  const remainingItems = document.querySelectorAll('#figuras .item');
  console.log('Items remaining:', remainingItems.length);
  
  if (remainingItems.length === 0) {
    console.log('Game won!');
    setTimeout(() => {
      document.getElementById('game-container').style.display = 'none';
      document.getElementById('victory-modal').classList.add('show');
    }, 300);
  }
}


function attachDropListeners() {
  const dropzones = document.querySelectorAll('.dropzone');
  
  dropzones.forEach(zone => {
    
    const newZone = zone.cloneNode(true);
    zone.parentNode.replaceChild(newZone, zone);
    
    newZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      newZone.classList.add('hovered');
    });

    newZone.addEventListener('dragleave', () => {
      newZone.classList.remove('hovered');
    });

    newZone.addEventListener('drop', (e) => {
      e.preventDefault();
      newZone.classList.remove('hovered');
      const draggedItem = document.querySelector('#figuras .item.dragging');
      
      if (draggedItem) {
        const itemValue = draggedItem.dataset.valor.trim();
        const zoneValue = newZone.dataset.valor.trim();
        
        if (itemValue === zoneValue) {
          
          const itemClone = draggedItem.cloneNode(true);
          itemClone.classList.remove('dragging');
          itemClone.draggable = false;
          
          newZone.innerHTML = '';
          newZone.appendChild(itemClone);
          const checkmark = document.createElement('strong');
          checkmark.innerHTML = '<br>✔️ Correto!';
          newZone.appendChild(checkmark);
          
          draggedItem.remove();
          checkWin();
        } else {
          alert("❌ Tente novamente!");
          draggedItem.classList.remove('dragging');
        }
      }
    });
  });
}


function attachDragListeners() {
  const items = document.querySelectorAll('#figuras .item');
  
  items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'move';
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });
}


attachDragListeners();
attachDropListeners();