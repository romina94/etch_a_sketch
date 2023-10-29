//rainbow

let activeColor = '#357162';
let numRowCol = 16;
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const sketchContainer = document.getElementById('sketch-container');
const colorPicker = document.getElementById('color-picker');
const rainbow = document.getElementById('rainbow');
const white = document.getElementById('white');
const eraser = document.getElementById('eraser');
const reset = document.getElementById('reset');
const rangeSlider = document.getElementById('range-slider');
const dimension = document.getElementById('dimension');

colorPicker.addEventListener('change', () => {
    setActiveColor(colorPicker.value);
});

rainbow.addEventListener('click', setActiveColor);

white.addEventListener('click', () => {
    setActiveColor('white');
});

eraser.addEventListener('click', () => {
    setActiveColor('#040D12');
});

reset.addEventListener('click', () => {
    const sketchCells = document.querySelectorAll('.sketch-cell');

    sketchCells.forEach((cell) => {
        cell.removeAttribute("style");
    });
    setActiveColor('#357162');
});

rangeSlider.addEventListener('change', (e) => {
    dimension.textContent = e.target.value + " x " + e.target.value;
    numRowCol = e.target.value;
    createSketchContainer(numRowCol);
});

function setActiveColor(color) {
    activeColor = color;
}

function createSketchContainer(numRowCol) {
    while (sketchContainer.hasChildNodes()) {
        sketchContainer.removeChild(sketchContainer.firstChild);
    }

    sketchContainer.style.gridTemplateColumns = 'repeat(' + numRowCol + ', auto)';

    const numCells = numRowCol * numRowCol;

    for (cell = 0; cell < numCells; cell++) {
        const sketchCell = document.createElement('div');
        sketchCell.classList.add("sketch-cell");
        sketchContainer.appendChild(sketchCell);
    }
    
    const sketchCells = document.querySelectorAll('.sketch-cell');
    
    sketchCells.forEach((cell) => {
        cell.addEventListener('mouseover', paint);
        cell.addEventListener('mousedown', paint);
    
        function paint(event) {
            if (event.type == 'mouseover' && !mouseDown) return;
            event.target.style.backgroundColor = activeColor;
        }
    });
}

createSketchContainer(numRowCol);