'use strict'

const MEMES_STORAGE_KEY = 'savedMemes'

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['donald trump', 'angry', 'politics', 'president'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['puppies', 'cute', 'love'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['baby', 'dog', 'cute', 'puppies'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['cat', 'sleep', 'laptop', 'cute', 'funny'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['angry', 'baby', 'funny'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['history', 'funny', 'movie'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['surprise', 'baby', 'funny'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['willy wonka', 'movie', 'funny', 'laugh'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['laugh', 'baby', 'funny'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['barack obama', 'laugh', 'politics'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['basketball', 'funny'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['series', 'funny'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['leonardo dicaprio', 'cheers', 'gatsby', 'movie'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['morpheus', 'matrix', 'movie'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['movie', 'lord of the rings'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['laugh', 'series', 'star trek'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['vladimir putin', 'politics', 'president'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['toy story', 'cartoon', 'movie'] },
]

var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'First Line',
            size: 35,
            color: 'purple',
            pos: { x: 50, y: 50 }
        },
        {
            txt: 'Second Line',
            size: 35,
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
        size: 35,
        color: 'darkgray',
        pos: {
            x: Math.random() * (gElCanvas.width - 40),
            y: Math.random() * (gElCanvas.height),
        }
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    newLine.lineArea = calcLineArea(newLine)
    renderMeme()
}
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
    renderMeme()
}

function saveMeme() {
    const memeUrl = gElCanvas.toDataURL('image/jpeg')
    const savedMemes = loadFromStorage(MEMES_STORAGE_KEY) || []
    savedMemes.push(memeUrl)
    saveToStorage(MEMES_STORAGE_KEY, savedMemes)
    console.log('Saved Memes:', savedMemes)
}

function alignLineLeft() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.pos.x = 10
}

function alignLineCenter() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const canvasWidth = gElCanvas.width
    const lineWidth = calcLineArea(line).width
    line.pos.x = (canvasWidth - lineWidth) / 2
}

function alignLineRight() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const canvasWidth = gElCanvas.width
    const lineWidth = calcLineArea(line).width
    line.pos.x = canvasWidth - lineWidth + 10
}

function changeLineFont(font) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.font = font
    console.log(line.font)
}

async function shareMeme(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}


