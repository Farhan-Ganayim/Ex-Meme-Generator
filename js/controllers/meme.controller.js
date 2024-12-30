'use strict'

let gElCanvas
let gCtx
let gStartPos = null

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElCanvas.addEventListener('click', onCanvasClick)
    renderGallery()
    renderMeme()
    addMouseListeners()
    addTouchListeners()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()

    img.src = `imgs/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach(line => {
            const fontFamily = line.font || 'Arial'
            gCtx.font = `${line.size}px ${fontFamily}`
            gCtx.fillStyle = line.color
            gCtx.fillText(line.txt, line.pos.x, line.pos.y)
            line.lineArea = calcLineArea(line)
        })
        drawFrameOnLine()
    }
}

function onSaveMeme() {
    saveMeme()
}

function onTextInput(text) {
    setLineTxt(text)
    renderMeme()
}

function onTextSubmit(ev) {
    ev.preventDefault()
    const text = ev.target.querySelector('.txt-input').value
    setLineTxt(text)
    renderMeme()
    // ev.target.querySelector('.txt-input').value = ''
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
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function drawFrameOnLine() {
    const meme = getMeme()
    if (meme.lines.length === 0) return
    const selectedLine = meme.lines[meme.selectedLineIdx]
    gCtx.strokeStyle = 'green'
    gCtx.lineWidth = 3
    gCtx.strokeRect(
        selectedLine.lineArea.x,
        selectedLine.lineArea.y,
        selectedLine.lineArea.width,
        selectedLine.lineArea.height,
    )
}

function calcLineArea(line) {
    gCtx.font = `${line.size}px Arial`
    const txtWidth = gCtx.measureText(line.txt).width
    const txtHeight = line.size
    return {
        x: line.pos.x - 10,
        y: line.pos.y - txtHeight - 2,
        width: txtWidth + 20,
        height: txtHeight + 10
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
}

function onShowSaved() {
    const savedMemes = loadFromStorage(MEMES_STORAGE_KEY) || []
    const savedSection = document.querySelector('.saved-memes')
    let strHTML = ''
    savedMemes.forEach(memeUrl => {
        strHTML += `<img src="${memeUrl}" alt="Saved Meme">`
    })
    savedSection.innerHTML = strHTML
    savedSection.classList.remove('hidden')
    // console.log(savedMemes)
    document.querySelector('.gallery-section').classList.add('hidden')
    document.querySelector('.editor-section').classList.add('hidden')
}

function onLineDown(ev) {
    const { offsetX, offsetY } = ev
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

    if (!selectedLine) return
    const lineArea = calcLineArea(selectedLine)
    if (
        offsetX >= lineArea.x &&
        offsetX <= lineArea.x + lineArea.width &&
        offsetY >= lineArea.y &&
        offsetY <= lineArea.y + lineArea.height
    ) {
        gStartPos = getEvPos(ev)
        selectedLine.isDrag = true
        document.body.style.cursor = 'grabbing'
    }
}

function onLineMove(ev) {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

    if (!selectedLine.isDrag) return
    const currentPos = getEvPos(ev)
    const dx = currentPos.x - gStartPos.x
    const dy = currentPos.y - gStartPos.y
    selectedLine.pos.x += dx
    selectedLine.pos.y += dy
    gStartPos = currentPos
    renderMeme()
}

function onLineUp() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.isDrag = false
    document.body.style.cursor = 'grab'
    gStartPos = null
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function leaveCanvas() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.isDrag = false
    document.body.style.cursor = 'default'
}

function enterCanvas() {
    document.body.style.cursor = 'grab'
}

function onAlignLeft() {
    alignLineLeft()
    renderMeme()
}

function onAlignCenter() {
    alignLineCenter()
    renderMeme()
}

function onAlignRight() {
    alignLineRight()
    renderMeme()
}
function onChangeFont(font) {
    changeLineFont(font)
    renderMeme()
}

function onShareMeme(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a href="${uploadedImgUrl}">My meme: </a>
           <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
           Share on Facebook  
        </button>`
    }
    shareMeme(canvasData, onSuccess)
}









