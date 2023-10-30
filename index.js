let activeMode = 'default';
let colorPickerColor = 'white';
let numRowCol = 16;
let mouseDown = false;

const sketchContainer = document.getElementById('sketch-container');
const colorPicker = document.getElementById('color-picker');
const rainbow = document.getElementById('rainbow');
const white = document.getElementById('white');
const eraser = document.getElementById('eraser');
const reset = document.getElementById('reset');
const rangeSlider = document.getElementById('range-slider');
const dimension = document.getElementById('dimension');

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorPicker.addEventListener('change', () => {
    activeMode = 'colorPicker';
    colorPickerColor = colorPicker.value;
});

rainbow.addEventListener('click', () => {
    activeMode = 'rainbow';
});

white.addEventListener('click', () => {
    activeMode = 'white';
});

eraser.addEventListener('click', () => {
    activeMode = 'eraser';
});

reset.addEventListener('click', () => {
    const sketchCells = document.querySelectorAll('.sketch-cell');

    sketchCells.forEach((cell) => {
        cell.removeAttribute("style");
    });

    activeMode = 'default';
    setActiveColor(activeMode);
});

rangeSlider.addEventListener('change', (e) => {
    dimension.textContent = e.target.value + " x " + e.target.value;
    numRowCol = e.target.value;
    createSketchContainer(numRowCol);
});

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
            event.target.style.backgroundColor = setActiveColor(activeMode);
        }
    });
}

function setActiveColor(activeMode) {
    switch (activeMode) {
        case 'colorPicker':
            return colorPickerColor;
        case 'rainbow':
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        case 'white':
            return 'white';
        case 'eraser':
            return '#040D12';
        default:
            return '#357162';
    }
}

createSketchContainer(numRowCol);