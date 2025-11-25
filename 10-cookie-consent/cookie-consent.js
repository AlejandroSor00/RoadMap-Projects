const $closeCookie = document.querySelector('.cookie-close')
const $cookieSection = document.querySelector('.cookie-section')
const $cookieButton = document.querySelector('.cookie-button')
const ACCEPTED_COOKIES = 'accepted-cookies'
$closeCookie.addEventListener('click', closeCookie)
$cookieButton.addEventListener('click', acceptCookies)
document.addEventListener('DOMContentLoaded', load)

function load(){
    const isAcceptedCookies = localStorage.getItem(ACCEPTED_COOKIES);
    if(isAcceptedCookies) closeCookie();
}

function acceptCookies(){
    localStorage.setItem(ACCEPTED_COOKIES, true);
    closeCookie();
}

function closeCookie() {
    $cookieSection.classList.add('hidden')
}

