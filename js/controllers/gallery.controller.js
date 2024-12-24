'use strict'


function renderGallery() {

    const elGallery = document.querySelector('.gallery-container')
    const imgs = getImgs()
    const strHTML = imgs.map(img => {
        return `<img src="${img.url}" class="gallery-img" onclick="onImgSelect(${img.id})" />`;
    }).join('')

    elGallery.innerHTML = strHTML
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    document.querySelector('.gallery-section').classList.add('hidden')
    document.querySelector('.editor-section').classList.remove('hidden')

}