function renderPianos(data) {
  const container = document.getElementById('pianos-container');
  
  data.forEach(piano => {
    const pianoCard = document.createElement('div');
    pianoCard.classList.add('piano-card');
    pianoCard.innerHTML = `
      <h2>${piano[0]}</h2>
      <p>${piano[1]}</p>
      <p>Price: $${piano[2]}</p>
      <p>Condition: ${piano[3]}</p>
      <p>Location: ${piano[4]}</p>
      <img src="${piano[5]}" alt="${piano[0]}">
    `;
    container.appendChild(pianoCard);
  });
}

// Fetch data from Google Sheet
fetch('https://script.google.com/macros/s/AKfycbyEXAMPLE/exec')
  .then(response => response.json())
  .then(data => renderPianos(data));