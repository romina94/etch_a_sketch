//rainbow, traka za povecavanje i smanjivanje

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
const rangeSlider = document.getElementById('range');
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
    sketchCells.forEach((cell) => {
        cell.removeAttribute("style");
    });
    setActiveColor('#357162');
});

function setActiveColor(color) {
    activeColor = color;
}

function createSketchContainer(numRowCol) {
    for (row = 0; row < numRowCol; row++) {
        const sketchRow = document.createElement('div');
        sketchRow.classList.add("sketch-row");
    
        for (cell = 0; cell < numRowCol; cell++) {
            const sketchCell = document.createElement('div');
            sketchCell.classList.add("sketch-cell");
            sketchRow.appendChild(sketchCell);
        }
    
        sketchContainer.appendChild(sketchRow);
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