// global variables for sketchArea and set sketch activation
const sketchArea = document.querySelector(".container")
const gridsize = document.querySelector("#userInput");
let getValue = parseInt(gridsize.value);
let randomColor;
let click = true;

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
    if (colorSelected === "randomColor") {
        randomColorSelector();
    } else if (colorSelected === "colorPicker") {
        colorPicker();
    } else if (colorSelected === "eraser") {
        erase();
    } else if (colorSelected === "default") {
        colorSelected = "#3facb5d4";;
        drawSketch(colorSelected);
    } else if (colorSelected === "drawBlackColor") {
        colorSelected = "rgb(20, 20, 20)"
        drawSketch(colorSelected);
    } else if (colorSelected ==="drawRainbow") {
        drawRainbow();
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

function randomRgbGenerator() {
    const randomRGBNumber = Math.round(Math.random()*250);
    return randomRGBNumber;
}

function randomColorSelector() {
    const randomColorButton=document.querySelector("#randomColor");
    randomColorButton.addEventListener("click", ()=> {
    // The global variable "random color" is modified by function hoverButtons(), which uses function randomRGBGenerator(). This is so that the hover color and color drawn match. 
        drawSketch(randomColor);
    })
}

function drawRainbow() {
    const drawRainbow = document.querySelector("#drawRainbow");
    drawRainbow.addEventListener("click", ()=> {
        canvasGrid = document.querySelectorAll(".grid");
        canvasGrid.forEach(box => {
            box.addEventListener("mouseenter", () => {
                box.style.backgroundColor = `rgb(${randomRgbGenerator()}, ${randomRgbGenerator()}, ${randomRgbGenerator()})`;
            })
        })
    })
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
    // all other buttons by default will have default background color.
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.classList.toggle("buttonHover")
        })
        button.addEventListener("mouseleave", () => {
            button.classList.toggle("buttonHover")
        })
    })
    // black button color.
    const blackButton = document.querySelector("#drawBlackColor");
    blackButton.addEventListener("mouseenter", () => {
        blackButton.style.backgroundColor = "rgb(20, 20, 20)";
        blackButton.style.color = "rgb(255, 255, 255)";
    })
    blackButton.addEventListener("mouseleave", () => {
        blackButton.style.backgroundColor = "rgb(255, 255, 255)"
        blackButton.style.color = "rgb(0, 0, 0)"
    })
    // random Color button hover color.
    const randomColorButton = document.querySelector("#randomColor");
    randomColorButton.addEventListener("mouseenter", () => {
        randomColor = `rgb(${randomRgbGenerator()}, ${randomRgbGenerator()}, ${randomRgbGenerator()})`;
        randomColorButton.style.backgroundColor = randomColor;
        
    })
    randomColorButton.addEventListener("mouseleave", () => {
        randomColorButton.style.backgroundColor = "rgb(255, 255, 255)"
        
    })
}

//Lessons Learnt:
// grid.style.setProperty("--n", size); Google it. 
//  https://stackoverflow.com/questions/62572845/css-grid-cells-dont-fill-all-available-space-when-the-gird-is-64-x-64
// use of :root in css

setGrid();
resetGrid();
hoverButtons();
chooseColorButton();