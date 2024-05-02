async function fetchData() {
    // Récupérer les données JSON
    console.log("v2");
    const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=SQa2rPdkYS217sCty3uz6eNVaZA0l295bQblnJe_8zKA-rtNdem-DE0-GDtnYIisM_cvrE6gLhAgJiVXEDJdcRcvGp4blP_mm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMj7zaZZCyyJg1PUAZFZnkYmk0dlf1ec8LoU-eNiELlVfoQMsthPU4b9rStfxXJ-An3Jiw3FCEOBl7HuJQ3hIpZLQEB_JWtpatz9Jw9Md8uu&lib=ML1OtzSUDqqBv5Rhp8Ibevq8tNrNXU7ET");
    const json = await res.json();
    return json.data; // Accéder à la propriété 'data'
  }
  
  
  async function afficherPianos() {
    const pianosData = await fetchData();
    var container = document.getElementById("pianos-container");
  
    pianosData.forEach(function(piano) {
      var pianoElement = document.createElement("div");
      pianoElement.classList.add("piano");
            
  
      pianoElement.innerHTML = `
        <h2>${piano.numero}</h2>
        <p>Couleur: ${piano.couleur}</p>
        <p>Prix: ${piano.prix}</p>
        <p>Prix de location: ${piano.prixloc}</p>
        <p>Photos: <a href="${piano.photos}">${piano.photos}</a></p>
        <img src="${piano.photo_site}" alt="Photo du piano"  style="width: 300px; height: 200px;"/>
      `;
  
      container.appendChild(pianoElement);
    });
  }
  
  // Appeler la fonction pour afficher les pianos au chargement de la page
  afficherPianos();
