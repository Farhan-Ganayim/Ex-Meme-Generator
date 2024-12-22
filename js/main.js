
function onTextInput(text){
    setLineTxt(text)
    renderMeme()
}

function onTextSubmit(ev){

    ev.preventDefault()
    const text = ev.target.querySelector('.txt-input').value
    setLineTxt(text)
    renderMeme()
    ev.target.querySelector('.txt-input').value=''
}