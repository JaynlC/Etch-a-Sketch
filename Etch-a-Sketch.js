// global variables for sketchArea and set sketch activation
const sketchArea = document.querySelector(".container")
const gridsize = document.querySelector("#userInput");
let getValue = parseInt(gridsize.value);
let click = true;

function chooseColorButton() {
    const buttons = document.querySelectorAll(".button");

    buttons.forEach(button => {
        button.addEventListener("click", e => {
            colorSelected = e.target.id;
            implementColor(colorSelected)
        })
    })
}

function implementColor(colorSelected) {
    if (colorSelected === "drawRgbColor") {
        console.log("rgb")
    } else if (colorSelected === "colorPicker") {
        colorPicker();
    } else if (colorSelected === "eraser") {
        erase()
    } else if (colorSelected === "default") {
        colorSelected = "#3facb5d4";;
        drawSketch(colorSelected);
    } else if (colorSelected === "drawBlackColor") {
        colorSelected = "rgb(20, 20, 20)"
        drawSketch(colorSelected);
    }
}

function colorPicker() {
    const colorPickerButtonInput = document.querySelector("#colorPickerInput");
    let colorSelected = colorPickerButtonInput.value;
    let buttonColor = document.querySelector("#colorPicker");
    buttonColor.addEventListener("mouseenter", () => {
        buttonColor.style.backgroundColor = colorSelected
    })
    buttonColor.addEventListener("mouseleave", () => {
        buttonColor.style.backgroundColor = "rgb(255, 255, 255)"
    })
    drawSketch(colorSelected);
}

function rgb() {
    // google rainbow effect. First how to randomly select background value, between 0 to 250. Three times. (RGB).
}

function drawSketch(color) {
    if (click) {
    canvasGrid = document.querySelectorAll(".grid");    
    canvasGrid.forEach(box => {
                box.addEventListener("mouseenter", () => {
                    box.style.backgroundColor = color;
                    }) 
            });
    }// // click and hold to draw? release, it stops drawing. Google it. 
}

function erase() {
    canvasGrid = document.querySelectorAll(".grid");
        canvasGrid.forEach(box => {
            box.addEventListener("mouseenter", () => {
                box.style.backgroundColor = "rgb(255,255,255)"
            }) 
        });
}

function setGrid() {
    gridsize.addEventListener("mouseup", () => {
        getValue = parseInt(gridsize.value);
        let gridSizeText = document.querySelector("#gridSizeText");
        gridSizeText.textContent = ` ${getValue} x ${getValue} `;
        createGrid(getValue)
    })
    createGrid(getValue); // initial value of grid is 16, set in HTML file, in ID gridSizeText.
}

function createGrid(userInput) {
    console.log(userInput)
    // while loop: remove any existing divs from container if gridsize changed. 
    while (sketchArea.firstChild) {
        sketchArea.firstChild.remove();
    }
    sketchArea.style.setProperty('--grid', userInput);
    for (let i=1; i<=(userInput*userInput) ; i++) {
        let grid = document.createElement("div");
        grid.classList.add("grid");
        sketchArea.appendChild(grid);
        
    } activateSketch();
}

function activateSketch() {
    
    sketchArea.addEventListener("click", () => {
        click = !click;
        // if click is true, then false. Vice versa. 
    })
    chooseColorButton();
} 

function resetGrid() {
    let resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", () => {
        const highlightedGrid = document.querySelectorAll(".grid");
        highlightedGrid.forEach(highlighted => {
            highlighted.style.backgroundColor = "rgb(255,255,255)"
        })
    })
}

function hoverButtons() {
    const buttons = document.querySelectorAll(".button");
    // all buttons by default will have background color.
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.classList.toggle("buttonHover")
        })
        button.addEventListener("mouseleave", () => {
            button.classList.toggle("buttonHover")
        })
    })
    // button for black:
    const blackButton = document.querySelector("#drawBlackColor");
    blackButton.addEventListener("mouseenter", () => {
        blackButton.style.backgroundColor = "rgb(20, 20, 20)";
        blackButton.style.color = "rgb(255, 255, 255)";
    })
    blackButton.addEventListener("mouseleave", () => {
        blackButton.style.backgroundColor = "rgb(255, 255, 255)"
        blackButton.style.color = "rgb(0, 0, 0)"
    })
}

// grid.style.setProperty("--n", size); Google it. 
//  https://stackoverflow.com/questions/62572845/css-grid-cells-dont-fill-all-available-space-when-the-gird-is-64-x-64
// use of :root in css

setGrid();
resetGrid();
hoverButtons();
chooseColorButton();

// To do: Rainbow effect. Click on and off. 