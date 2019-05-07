/*jshint esversion: 6 */

const panels = document.querySelectorAll('.panel');
var prevOne;

function showCard() {
    if(prevOne === undefined) {
        prevOne = this;
    }

    if(this.dataset.toggle == 'true') {
        this.style.flex = '1';
        this.dataset.toggle = 'false';
        prevOne.classList.toggle('open');
    } else {
        prevOne.style.flex = '1';
        prevOne.dataset.toggle = 'false';
        prevOne.classList.remove('open');

        this.classList.toggle('open');
        this.style.flex = '5';
        this.dataset.toggle = 'true';
    }

    prevOne = this;
}

panels.forEach(panel => panel.addEventListener('click', showCard));