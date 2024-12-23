'use strict'

let gElCanvas
let gCtx

function onInit() {

    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElCanvas.addEventListener('click', onCanvasClick)

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
            line.lineArea = calcLineArea(line)
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
    // switchLine()

    renderMeme()
}

function drawFrameOnLine() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    // gCtx.font = `${selectedLine.size}px Arial`
    // const txtWidth = gCtx.measureText(selectedLine.txt).width
    // const txtHeight = selectedLine.size
    // console.log(txtWidth)
    selectedLine.lineArea=calcLineArea(selectedLine)

    gCtx.strokeStyle = 'green'
    gCtx.lineWidth = 3
    gCtx.strokeRect(
        selectedLine.lineArea.x,
        selectedLine.lineArea.y,
        selectedLine.lineArea.width,
        selectedLine.lineArea.height,
    )
}

function calcLineArea(line){
    gCtx.font=`${line.size}px Arial`
    const txtWidth = gCtx.measureText(line.txt).width
    const txtHeight = line.size
    return{
        x:line.pos.x-10,
        y:line.pos.y-txtHeight-2,
        width:txtWidth+20,
        height:txtHeight+10
    }
}

function onCanvasClick(ev) {
    const { offsetX, offsetY } = ev
    const meme = getMeme()

    const clickedLineIdx = meme.lines.findIndex(line => {
        const lineClickArea = line.lineArea
        if (!lineClickArea) return false
        return (
            offsetX >= lineClickArea.x &&
            offsetX <= lineClickArea.x + lineClickArea.width &&
            offsetY >= lineClickArea.y &&
            offsetY <= lineClickArea.y + lineClickArea.height
        )
    })

    if (clickedLineIdx !== -1) {
        meme.selectedLineIdx = clickedLineIdx
        renderMeme()
    }
    console.log();
    console.log('delivery');
    
    
}








