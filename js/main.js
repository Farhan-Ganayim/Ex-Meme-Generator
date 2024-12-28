
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onLineDown)
    gElCanvas.addEventListener('mousemove', onLineMove)
    gElCanvas.addEventListener('mouseup', onLineUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onLineDown)
    gElCanvas.addEventListener('touchmove', onLineMove)
    gElCanvas.addEventListener('touchend', onLineUp)
}