
// add api key and spreadsheet ID
// make sure google sheets API is enabled
// https://support.google.com/googleapi/answer/6158862?hl=en

var API_KEY = 'AIzaSyCIgQLkn_z7h_B6fbYj3SzlLvKOBD4-43w';
var SPREADSHEET_ID = '1Zfoj-ENAKuf-72O4p-H_3qwwNtOWPTIuJQTkCy46hQQ';
var SHEET_NAME = 'Form Responses 1';


// get spreadsheet data... dont edit any of this

var response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${ SPREADSHEET_ID }/values/${ SHEET_NAME }?alt=json&key=${ API_KEY }`);
var data = await response.json();
var [header, ...rows] = data.values;
var entries = rows.map(row => Object.fromEntries(header.map((key, i) => [key.toLowerCase(), row[i] || ""])));


// log entries to the console
console.log(entries);

// get the entries container 
var entriesContainer = document.querySelector('.entries');

// add the entries to the page
entries.forEach((entry) => {

    //log the entry to the console
    console.log(entry);

    // add entry to the entries container 
    entriesContainer.innerHTML += `
        <li class="entry">
            <h2 class="entry-name">${ entry.name }</h2>
            <p class="entry-comment">${ entry.comment}</p>
        </li>
    `;
});
