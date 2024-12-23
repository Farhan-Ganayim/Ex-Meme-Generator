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
            gCtx.font =  `${line.size}px Arial`
            gCtx.fillStyle = line.color
            gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        })
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
function onAddLine(){
    addLine()
    switchLine()
    renderMeme()
}




