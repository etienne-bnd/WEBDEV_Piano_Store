document.addEventListener('DOMContentLoaded', function() {
    fetchPianoData();
});    
console.log(someUndefinedVariablee.property);
async function fetchPianoData() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzYiTPkDfCTBtBNQgsoCMyeLYY6-IDI7OCgaWtHo48puDZBjnG1Z_GalazAe-eDAzac0Q/exec');
    console.log(response) 
    const data = await response.json();
    console.log('Piano Data:', data); // Log the loaded data to the console pour tester si les donées sont bien là
    // Now 'data' contains the piano information from your Google Sheet.
    // You can use this data to update your website.
    
  } catch (error) {
    console.error('probleme lors de la récupération de piano data:', error);
  }
}


function renderPianoList(pianos) {
    const pianoListElement = document.getElementById('piano-list');

    pianos.forEach(piano => {
        const name = piano.gsx$name.$t;
        const type = piano.gsx$type.$t;
        const price = piano.gsx$price.$t;

        const pianoCard = document.createElement('div');
        pianoCard.classList.add('piano-card');
        pianoCard.innerHTML = `
            <h2>${name}</h2>
            <p>Type: ${type}</p>
            <p>Price: $${price}</p>
        `;
        pianoListElement.appendChild(pianoCard);
    });
}

