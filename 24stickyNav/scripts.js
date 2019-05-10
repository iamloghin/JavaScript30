/*jshint esversion: 6*/

const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

function fixNav() {
    if(window.scrollY >= topOfNav) {
        nav.classList.add('fixed-nav');
    } else {
        nav.classList.remove('fixed-nav');
    }
}

window.addEventListener('scroll', fixNav);