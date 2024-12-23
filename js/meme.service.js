'use strict'

var gImgs = [
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['dog', 'cute'] }
]

var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'First Line',
            size: 20,
            color: 'black',
            pos: { x: 50, y: 50 }
        },
        {
            txt: 'Second Line',
            size: 20,
            color: 'blue',
            pos: { x: 50, y: 450 }
        }
    ]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function changeFontSize(diff) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.size += diff
    if (line.size < 10) line.size = 10
}

function switchLine() {

    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function addLine() {

        const newLine = {
        txt: 'New Line',
        size: 20,
        color: 'red',
        pos: {
            x: Math.random()*(gElCanvas.width-40),
            y: Math.random()*(gElCanvas.height),
        }
    }
    gMeme.lines.push(newLine)
}



