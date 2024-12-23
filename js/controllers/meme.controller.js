'use strict'

let gElCanvas
let gCtx

function onInit() {

    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
}

function renderMeme() {

    const meme = getMeme()
    const img = new Image()

    img.src = `imgs/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach(line => {
            gCtx.font = `${line.size}px Arial`
            gCtx.fillStyle = line.color
            // gCtx.textAlign = 'center'
            gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        })
        drawFrameOnLine()
    }
}

function onDownloadMeme(elLink) {
    const imgURL = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgURL
}

function onIncreaseFont() {
    changeFontSize(2)
    renderMeme()
}

function onDecreaseFont() {
    changeFontSize(-2)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}
function onAddLine() {
    addLine()
    switchLine()
    renderMeme()
}

function drawFrameOnLine() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    gCtx.font = `${selectedLine.size}px Arial`
    const txtWidth = gCtx.measureText(selectedLine.txt).width
    const txtHeight = selectedLine.size
    // console.log(txtWidth)

    gCtx.strokeStyle = 'green'
    gCtx.lineWidth = 3
    gCtx.strokeRect(
        selectedLine.pos.x - 10,
        selectedLine.pos.y - txtHeight,
        txtWidth + 20,
        txtHeight + 10

    )


}






