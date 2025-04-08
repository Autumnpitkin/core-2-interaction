// get the entries
var request = await fetch('assets/entries.json');
var entries = await request.json();

console.log(entries);

// get the input elements
var animalSelect = document.querySelector('select[name="animal"]');
var natureSelect = document.querySelector('select[name="nature"]');
var buildingSelect = document.querySelector('select[name="building"]');

console.log(animalSelect, natureSelect, buildingSelect);

// get the sumbit button 
var submitButton = document.querySelector('button[name="submit"]');

console.log(submitButton);

// get the output element 
var output = document.querySelector('.output');

console.log(output);

// add event listner to the button 
submitButton.addEventListener('click', () => {
   
    // get the active settings 
    var animal = animalSelect.value;
    var nature = natureSelect.value;
    var building = buildingSelect.value;

    console.log(animal, nature, building);

    // get the matching entry 
    var matchingEntry = entries.find((entry) => {
        return entry.animal == animal
            && entry.nature == nature
            && entry.building == building;
    })

    console.log(matchingEntry);

    if(matchingEntry) {
        output.innerHTML = `
            <h1>YOUR DREAM HAS BEEN</h1>
            <h2>GENERATED</h2>
            <img class="image" src="img/${ matchingEntry.filename}">
            <h3>${ matchingEntry.text}"</h3>
        `;
    } else {
        output.innerHTML = `<div class="message"> Nothing found :( </div>`;
    }

})



