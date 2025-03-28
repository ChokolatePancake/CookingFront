document.addEventListener("DOMContentLoaded", initBurger);

function initBurger () {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__buttons-container');
    burger.addEventListener('click', () => {
        menu.classList.toggle('show');
    })
}