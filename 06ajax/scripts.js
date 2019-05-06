/*jshint esversion: 6 */

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');


fetch(endpoint)
    .then(blob => blob.json())
    .then(blob => cities.push(...blob));

function findMatches(valueToMatch) {
    return cities.filter(place => {
        const regex = new RegExp(valueToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

function displayMatches() {
    const matchCities = findMatches(this.value);
    const htmlLists = matchCities
            .sort((a, b) => a.population + b.population)
            .map(place => {
                const regex = new RegExp(this.value, 'gi');
                const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
                const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

                return `
                    <li>
                        <span class="name">${cityName}, ${stateName}</span>
                        <span class="population">${numberWithCommas(place.population)}</span>
                    </li>
                `;
            }).join('');

    suggestions.innerHTML = htmlLists;
}

searchInput.addEventListener('keyup', displayMatches);