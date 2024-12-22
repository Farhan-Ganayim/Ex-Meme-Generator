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
            gCtx.font = '30px Arial';
            gCtx.fillStyle = 'red';
            gCtx.fillText(line.txt, 50, 50)
        })
    }
}