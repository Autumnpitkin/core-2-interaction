const API_KEY = 'AIzaSyApeeE08W5tWFypLaQrWQDoKdOtMtn3Tw8';
const SPREADSHEET_ID = '1yk7XG4xQe4MO2KUWmDMkGHKcwPDo-uR-n_AKWKq9atQ';
const SHEET_NAME = 'Form Responses 1';

const imageMap = {
    "Ice Water Facial": "images/ice-water.png",
    "Wind-Proof Your Hair Style": "images/wind-proof.png",
    "Hanger Trick to Save Space": "images/hanger-trick.png",
    "DIY Heel Blister Pads": "images/heel-pads.png",
    "No Sew Shirt Fix from Baggy to Fitted": "images/no-sew-shirt.png",
    "How to Maximize Draw Space": "images/draw-space.png",
    "Bathroom Storage Life Hack": "images/bathroom-storage.png",
    "Reduce Back Pain from School Bags": "images/back-pain.png",
    "Reusable Water Bottle for Class": "images/water-bottle.png",
    "Hair Tie Heel Fix": "images/hair-tie-heel.png",
    "DIY Laptop Stand to Prevent Overheating": "images/laptop-stand.png",
    "Shoe Organizer for Snacks": "images/shoe-organizer.png",
    "Sweater Shaver Substitute": "images/sweater-shaver.png",
    "DIY Bag Sealer": "images/bag-sealer.png",
    "Deodorant Mark Removal": "images/deodorant-marks.png",
    "How to Fix a Clogged Drain": "images/clogged-drain.png",
    "Want to Find a Program for Free?": "images/free-program.png",
    "How to Fix Wrinkly Clothes": "images/fix-wrinkly-clothes.png",
    "Take Advantage of Student Discounts!": "images/student-discounts.png",
    "Loft Your Bed for More Storage": "images/loft-bed.png",
    "Presentation Anxiety Life Hack": "images/presentation-anxiety.png",
    "Use RateMyProfessor.com!": "images/rate-my-professor.png",
    "Dining Hall To-Go": "images/dining-hall-to-go.png",
    "Extra-Long Charger Tip": "images/extra-long-charger-tip.png",
    "Microwave Meals": "images/microwave-meals.png",
    "ID Holder Tip": "images/id-holder-tip.png",
    "Pizza Reheat Hack": "images/pizza-reheat-hack.png",
    "Use your Resources": "images/use-your-resources.png",
    "Do Not Buy Textbooks Right Away": "images/do-not-buy-textbooks-right-away.png",
    "Talk to Your Professors": "images/talk-to-your-professors.png",
    "Watch a Movie on a Budget": "images/watch-a-movie-on-a-budget.png",
    "DIY Lipscrub": "images/diy-lipscrub.png",
    "Deodorize Carpets with Baking Soda": "images/bakingsoda-carpet.png",
    "Sanitize Sponges Quickly in the Microwave": "images/clean-sponges-microwave.png"
};

let entries = [];

// Function to load entries from Google Sheets
async function loadEntries() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?alt=json&key=${API_KEY}`);
    const data = await response.json();
    const [header, ...rows] = data.values;

    entries = rows.map(row => Object.fromEntries(header.map((key, i) => [key.toLowerCase(), row[i] || ""])));

    const entriesContainer = document.querySelector('.entries');
    entriesContainer.innerHTML = ''; // clear previous content

    const categories = {};

    entries.forEach(entry => {
        const title = entry["what is your hack called?"];
        const type = entry["what type of hack is this?"];
        const description = entry["description of the hack (how does your hack work? give us the steps or the idea behind it!)"];
        const creditKey = Object.keys(entry).find(key => key.toLowerCase().includes("credit"));
        const credit = creditKey ? entry[creditKey] : "No credit given";
        const image = imageMap[title.trim()] || "";

        // Group by category
        if (!categories[type]) categories[type] = [];
        categories[type].push({ title, description, credit, image });
    });

    // Render grouped entries
    for (const category in categories) {
        const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-'); // make a clean id
        entriesContainer.innerHTML += `<h3 id="${categoryId}" class="category-heading">${category}</h3><ul class="category-entries"></ul>`;
        const lastList = entriesContainer.querySelectorAll('.category-entries');
        const categoryList = lastList[lastList.length - 1];

        categories[category].forEach(({ title, description, credit, image }) => {
            categoryList.innerHTML += `
                <li class="entry" data-entry-id="${title}">
                    ${image ? `<img src="${image}" alt="${title}" class="entry-image" />` : ''}
                    <details>
                        <summary>
                            <h2 class="entry-title">${title}</h2>
                        </summary>
                        <p class="entry-description">${description}</p>                        
                        
                    </details>
                    <p class="entry-credit"><strong>Credit:</strong> ${credit}</p>
                    <button class="save-btn">♡ Save</button>
                </li>
            `;
        });
    }

    // Update the save button state for each entry based on localStorage
    updateSaveButtonState();
}

// ✅ Call this once DOM is ready
loadEntries();

// Function to update the save button state for saved entries
function updateSaveButtonState() {
    const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || {};
    const saveButtons = document.querySelectorAll('.save-btn');

    saveButtons.forEach(button => {
        const entryElement = button.closest('.entry');
        const entryId = entryElement.getAttribute('data-entry-id');

        if (savedEntries[entryId]) {
            button.textContent = '♥ Saved'; // Change to "Saved" if it's already saved
        } else {
            button.textContent = '♡ Save'; // Default to "Save"
        }
    });
}

// Event listener for saving and unsaving entries
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('save-btn')) {
    const entryElement = e.target.closest('.entry');
    const entryId = entryElement.getAttribute('data-entry-id');
    const title = entryElement.querySelector('.entry-title').textContent;
    const description = entryElement.querySelector('.entry-description').textContent;
    const image = entryElement.querySelector('.entry-image') ? entryElement.querySelector('.entry-image').src : '';
    const credit = entryElement.querySelector('.entry-credit').textContent;

    // Toggle the save state
    if (e.target.textContent === '♡ Save') {
      // Save to localStorage
      e.target.textContent = '♥ Saved';
      saveToLocalStorage(entryId, { title, description, image, credit });
      addToSavedSection({ title, description, image, credit, entryId });
    } else {
      // Remove from localStorage
      e.target.textContent = '♡ Save';
      removeFromLocalStorage(entryId);
      removeFromSavedSection(entryId);
    }
  }
});

// Function to save entry to localStorage
function saveToLocalStorage(id, entry) {
  let savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || {};
  savedEntries[id] = entry;
  localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
  updateSaveButtonState(); // Update the button state for saved entries
}

// Function to remove entry from localStorage and update the UI
function removeFromLocalStorage(id) {
  let savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || {};
  delete savedEntries[id];
  localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
  updateSaveButtonState(); // Update the button state for unsaved entries
}

// Function to add the saved entry to the Saved section immediately
function addToSavedSection({ title, description, image, credit, entryId }) {
  const savedEntriesContainer = document.getElementById('savedEntries');
  savedEntriesContainer.innerHTML += `
    <div class="saved-entry" data-entry-id="${entryId}">
        <details>
            <summary>
                <h3>${title}</h3>
                ${image ? `<img src="${image}" alt="${title}" class="saved-entry-image" />` : ''}
            </summary>
            <p>${description}</p>
            <p><strong></strong> ${credit}</p>
        </details>
        <button class="unsave-btn">Unsave</button>
    </div>
  `;
}

// Function to remove the unsaved entry from the Saved section immediately
function removeFromSavedSection(entryId) {
  const savedEntriesContainer = document.getElementById('savedEntries');
  const entryToRemove = savedEntriesContainer.querySelector(`.saved-entry[data-entry-id="${entryId}"]`);
  if (entryToRemove) {
    savedEntriesContainer.removeChild(entryToRemove);
  }
}

// Event listener for unsaving entries in the Saved Tab
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('unsave-btn')) {
    const entryElement = e.target.closest('.saved-entry');
    const entryId = entryElement.getAttribute('data-entry-id');
    removeFromLocalStorage(entryId); // Remove from localStorage and update the UI
    removeFromSavedSection(entryId); // Remove from the Saved section in the DOM
  }
});

// Event listener for the "Saved" button in the navigation bar
document.querySelector('#savedTab').addEventListener('click', (e) => {
    e.preventDefault();  // Prevent the default behavior of the anchor tag (if it's a link)
    
    // Scroll smoothly to the saved section
    document.getElementById('savedSection').scrollIntoView({
      behavior: 'smooth'
    });
  });

  const customCursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (e) => {
  customCursor.style.left = e.clientX + "px";
  customCursor.style.top = e.clientY + "px";
});



  
  
  document.querySelector('.print-button').addEventListener('click', function () {
    window.print();
});

  