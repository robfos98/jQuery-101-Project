let previous = [];
const next = () => {
    if (previous.length === 87) {
        alert('There are no more Star Wars characters, Sweaty! ;)')
        previous.push(0);
        return;
    } else if (previous.length === 88) {
        alert("Okay, maybe there are more, but that's all you're getting.");
        return;
    }
    let x = 1 + Math.floor((87 - previous.length) * Math.random());
    let bump = previous;
    let thru = false;
    while (!thru) {
        thru = true;
        let i = 0;
        while (i < bump.length) {
            if (x >= bump[i]) {
                x++;
                bump = bump.slice(0, i).concat(bump.slice(i + 1));
                thru = false;
            } else { i++; }
        }
    }
    previous.push(x);
    return;
}
const capitalize = string => {
    if (typeof (string) !== 'string' || !string) {
        return string;
    } else {
        const subCapitalize = subString => subString[0].toUpperCase() + subString.slice(1);
        [' ', '-', '(', '/'].forEach(spacer => {
            string = string.split(spacer);
            string.forEach(function (subString, index) { string[index] = subCapitalize(subString); });
            string = string.join(spacer);
        });
        return string;
    }
}
const display = (x, isNew) => {
    if (x > 16) { x++; }
    $.get(`https://akabab.github.io/starwars-api/api/id/${x}.json`, char => {
        const helper = (trait, which) => {
            switch (which) {
                case 0: return trait ? capitalize(trait) : 'Unknown';
                case 1: return trait ? capitalize(trait) : 'N/A';
                default: return trait ? trait + which : 'Unknown';
            }
        }
        $('h1').text(char.name);
        $('main img').attr('alt', char.name);
        $('main img').attr('src', char.image);
        $('#species').text(helper(char.species, 0));
        $('#gender').text(helper(char.gender, 1));
        $('#homeworld').text(helper(char.homeworld, 0));
        $('#height').text(helper(char.height, ' meters'));
        $('#mass').text(helper(char.mass, ' kilograms'));
        $('#hairColor').text(helper(char.hairColor, 1));
        $('#eyeColor').text(helper(char.eyeColor, 1));
        $('#skinColor').text(helper(char.skinColor, 1));
        if (isNew) {
            if (x > 16) { x--; }
            $('aside').prepend(
                `<div id="${x}">
                    ${char.name}
                    <img src="${char.image}" alt="${char.name}">
                </div>`);
        }
    });
}
$(document).ready(() => {
    next();
    display(previous[previous.length - 1], true);
    $(document).on('click', 'button', () => {
        next();
        display(previous[previous.length - 1], previous.length < 88);
    }).on('click', 'div', function () {
        display($(this).attr('id'), false);
    });
});