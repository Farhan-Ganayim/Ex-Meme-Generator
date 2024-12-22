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
            txt: 'First Meme',
            size: 20,
            color: 'black'
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


