const $textarea = document.querySelector('.textarea')
const $charactersText = document.querySelector('.textarea-characters')
$textarea.addEventListener('input', () => {
    updateTextHandler() });


function updateTextHandler() {
  $charactersText.textContent = `${$textarea.value.length} / 250`
}