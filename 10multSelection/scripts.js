/*jshint esversion: 6*/

const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let firstChecked;
let lastChecked;

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

function handleCheck(e) {
    let index = 0;

    if(e.shiftKey) {
        checkboxes.forEach(checkbox => {
            if(checkbox === this) {
                if(firstChecked === undefined) {
                    firstChecked = index;
                    lastChecked = index;
                } else {
                    lastChecked = index;
                }
            }
            index++;
        });

        if(firstChecked > lastChecked) [firstChecked, lastChecked] = [lastChecked, firstChecked];

        index = 0;
        checkboxes.forEach(checkbox => {
            if(firstChecked !== undefined) {
                if(index >= firstChecked && index <= lastChecked) {
                    checkbox.checked = true;
                }
                else {
                    checkbox.checked = false;
                }
            }
            index++;
        });
    }
}