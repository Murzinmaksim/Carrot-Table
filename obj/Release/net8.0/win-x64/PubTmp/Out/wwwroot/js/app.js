let isResizing = false;
let currentTh = null;
let startX = 0;
let startWidth = 0;

function getRandomText() {
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const textLength = Math.floor(Math.random() * 10) + 1;
  let randomText = "";
  for (let i = 0; i < textLength; i++) {
      const randomIndex = Math.floor(Math.random() * possibleChars.length);
      randomText += possibleChars.charAt(randomIndex);
  }
  return randomText;
}

function setRandomText() {
  const tableBody = document.querySelector('#resizableTable tbody');
  for (let i = 0; i < 60; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement('td');
        cell.textContent = getRandomText();
        row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
}
  
function handleMouseDown(e) {
  isResizing = true;
  currentTh = e.target.parentElement;
  startX = e.clientX;
  startWidth = currentTh.offsetWidth;
 
  document.body.style.userSelect = 'none';
}

function handleMouseMove(e) {
  if (!isResizing) return;

  let newWidth = startWidth + (e.clientX - startX);
  currentTh.style.width = newWidth + 'px';
}

function handleMouseUp() {
  isResizing = false;
  document.body.style.userSelect = '';
  currentTh.style.transition = '';
}

function resize(){
  let resizableThs = document.querySelectorAll('.resizable');
  resizableThs.forEach(function (th) {
      let resizer = th.querySelector('.resizer');
      resizer.addEventListener('mousedown', handleMouseDown);
  });
}
  
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  setRandomText();
  resize();
});