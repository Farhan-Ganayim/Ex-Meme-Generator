'use strict'


function renderGallery(imgs = getImgs()) {

    const elGallery = document.querySelector('.gallery-container')
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

function onFilterGallery() {
    const searchInput = document.querySelector('.search-input').value.toLowerCase()
    console.log(searchInput)
    const elGallery = document.querySelector('.gallery-container')

    const imgs = getImgs()
    console.log(imgs)

    const filteredImgs = imgs.filter(img =>
        img.keywords.join(' ').toLowerCase().includes(searchInput)
    )
    renderGallery(filteredImgs)
    
}