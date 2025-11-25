var $navs = Array.from(document.querySelector('.nav-section').children);
var $contentSection = Array.from(document.querySelector('.content-section').children)
var $selectedSectionElement = document.querySelector('.selected')
var $selectedTabNavElement = document.querySelector('.tab-selected')
$navs.forEach(function ($nav, index) {
    console.log($nav);
    $nav.addEventListener('click', function () { return updateNavOnClick($nav, index); });
});
function updateNavOnClick($nav, index) {
    $selectedSectionElement.classList.remove('selected')
    $contentSection[index].classList.add('selected')
    $selectedSectionElement = $contentSection[index]
    $selectedTabNavElement.classList.remove('tab-selected')
    $selectedTabNavElement = $nav
    $nav.classList.add('tab-selected')
    
}
