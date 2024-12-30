
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onLineDown)
    gElCanvas.addEventListener('mousemove', onLineMove)
    gElCanvas.addEventListener('mouseup', onLineUp)
    gElCanvas.addEventListener('mouseleave', leaveCanvas)
    gElCanvas.addEventListener('mouseenter', enterCanvas)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onLineDown)
    gElCanvas.addEventListener('touchmove', onLineMove)
    gElCanvas.addEventListener('touchend', onLineUp)
}
