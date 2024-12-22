'use strict'


function renderGallery() {

    const elGallery = document.querySelector('.gallery-section')
    const imgs = getImgs()
    const strHTML = imgs.map(img => {
        return `<img src="${img.url}" class="gallery-img" onclick="onImgSelect(${img.id})" />`;
    }).join('')

    elGallery.innerHTML = `  <h2>Gallery</h2>
        <div class="img-container">
            ${strHTML}
        </div>`
}
function onImgSelect(imgId){
    setImg(imgId)
    renderMeme()

}