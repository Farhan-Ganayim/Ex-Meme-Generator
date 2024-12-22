'use strict'

let gElCanvas
let gCtx

renderMeme()

function renderMeme() {

    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    const img = new Image()
    img.src = 'imgs/3.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        gCtx.font = '30px Arial';
        gCtx.fillStyle = 'red';
        gCtx.fillText('First Meme', 50, 50)
    }
}