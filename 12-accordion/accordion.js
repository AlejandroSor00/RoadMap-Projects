const $accordions =  Array.from(document.querySelector('.accordions-wrapper').children)

$accordions.forEach(($accordion, index) => {
    $accordion.addEventListener('click', () => {openAccordion(index)})
})

function openAccordion (index) {
   const $accordionText = $accordions[index].lastElementChild
  if($accordionText.classList.contains('visible'))     $accordionText.classList.remove('visible')
  else $accordionText.classList.add('visible')
}