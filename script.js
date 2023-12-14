document.addEventListener('DOMContentLoaded', function() {
  initClient(); // Initialiser l'API Google Sheets
  fetchPianoData();
});

function initClient() {  // pour initier l'api google sheet
  gapi.load('client', () => {
      gapi.client.init({
          apiKey: 'AIzaSyBZnPzgKWvTq3gyRli2APuB3yGJLUAMDbc',
          discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(() => {
          // L'API est prête, vous pouvez maintenant effectuer des requêtes
      });
  });
}

async function fetchPianoData() {
  try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzYiTPkDfCTBtBNQgsoCMyeLYY6-IDI7OCgaWtHo48puDZBjnG1Z_GalazAe-eDAzac0Q/exec');
      const data = await response.json();

      console.log('Piano Data:', data); // Log the loaded data to the console for testing
      renderPianoList(data); // Appel de la fonction pour afficher les données

  } catch (error) {
      console.error('Problème lors de la récupération de piano data:', error);
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
