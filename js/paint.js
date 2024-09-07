const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const brushwidth = document.querySelector("#brush-width")
const brushColor = document.querySelector("#color-picker")
const brush = document.querySelector(".brush")
const eraser = document.querySelector(".eraser")
const clearbtn = document.querySelector(".clear")
const savebtn = document.querySelector(".save")


let is_drawing = false
let currentwidth = 5
let currentcolor = ""

window.addEventListener("load",() => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width,canvas.height)
})


function startDraw () {
    is_drawing = true
    ctx.beginPath()
    ctx.lineWidth = currentwidth
}

function drawing(e) {
    if (!is_drawing) {
        return;
    }

    let x, y;
    if (e.touches) { // در صورتی که لمسی باشد
        const touch = e.touches[0]; // دریافت اولین لمسه
        x = touch.clientX - canvas.offsetLeft;
        y = touch.clientY - canvas.offsetTop;
    } else { // در صورتی که ماوس باشد
        x = e.offsetX;
        y = e.offsetY;
    }

    ctx.lineTo(x, y);
    ctx.strokeStyle = `${currentcolor}`;
    ctx.stroke();
}

function endDraw () {
    is_drawing = false
}




canvas.addEventListener("mousedown",startDraw)
canvas.addEventListener("touchstart",startDraw)

canvas.addEventListener("mousemove",drawing)
canvas.addEventListener("touchmove",drawing)

canvas.addEventListener("mouseup",endDraw)
canvas.addEventListener("touchend",endDraw)



brushwidth.addEventListener("change",() => {
    currentwidth = brushwidth.value
})
brushColor.addEventListener("change",() => {
    currentcolor = brushColor.value
    
})

eraser.addEventListener("click",()=>{
    eraser.classList.add("active")
    brush.classList.remove("active")
    currentcolor = "white"
    brushColor.classList.add("notactive")
    
})
brush.addEventListener("click",()=>{
    brush.classList.add("active")
    eraser.classList.remove("active")
    currentcolor = brushColor.value
    brushColor.classList.remove("notactive")
})
clearbtn.addEventListener("click",() => {
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width,canvas.height)
})
savebtn.addEventListener("click",() => {
    let link = document.createElement("a")
    link.download = "pooya.jpg"
    link.href = canvas.toDataURL()
    link.click()
})
