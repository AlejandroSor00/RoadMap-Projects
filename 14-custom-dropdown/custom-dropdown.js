const $defaultDropdown = document.querySelector('.dropdown-defaut')
const $optionDropdown = document.querySelector('.dropdown-options')
let $selectedDropdown = null
const $optionsDropdown = Array.from($optionDropdown.children)


$optionsDropdown.forEach(($option, index) => {
      $option.addEventListener('click', () => {handleClickDropdown(index)})
});

$defaultDropdown.addEventListener('click', () => {handleOpenDropdown()})

function handleClickDropdown(index){
  $defaultDropdown.textContent = $optionsDropdown[index].textContent
  $optionDropdown.classList.remove('visible')
   $selectedDropdown?.classList.remove('selected')
   $optionsDropdown[index].classList.add('selected')
   $selectedDropdown = $optionsDropdown[index]
}

function handleOpenDropdown(){
    if($optionDropdown.classList.contains('visible'))     $optionDropdown.classList.remove('visible')
    else $optionDropdown.classList.add('visible')
}