'use strict'

function renderGallery(imgs = getImgs()) {
    const elGallery = document.querySelector('.gallery-container')
    const strHTML = imgs.map(img => {
        return `<img src="${img.url}" class="gallery-img" onclick="onImgSelect(${img.id})" />`;
    }).join('')

    elGallery.innerHTML = strHTML
}

function onShowGallery() {
    document.querySelector('.search-input').value = ''
    document.querySelector('.gallery-section').classList.remove('hidden')
    document.querySelector('.editor-section').classList.add('hidden')
    document.querySelector('.saved-memes').classList.add('hidden')
    renderGallery()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    document.querySelector('.gallery-section').classList.add('hidden')
    document.querySelector('.editor-section').classList.remove('hidden')
    document.querySelector('.saved-memes').classList.add('hidden')
}
function onImgInput() {
    loadImageFromInput(ev, addToGallery)
}

function onFilterGallery() {
    const searchInput = document.querySelector('.search-input').value.toLowerCase()
    const imgs = getImgs()
    const filteredImgs = imgs.filter(img =>
        img.keywords.join(' ').toLowerCase().includes(searchInput)
    )
    renderGallery(filteredImgs)
}

function searchKeyword(keyword) {
    const searchInput = document.querySelector('.search-input')
    searchInput.value = keyword
    onFilterGallery()
}

// function increaseFontSize(){
//     const maxSize=2
//     const fontSizeStep =0.1
//     let newFontSize
// }