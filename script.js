async function fetchData() {
    // Récupérer les données JSON
    console.log("v1");
    const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=UadSIcqNxA6wbqe1QahitxPeEw8iHeMiXiA7Ozp0KI5jzx9U8Su2hdH6pzho7hipiyqUCZpJFBquZC3fTKlsawuX7yW0F8fgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDwkVCIKayn3K5IPBF5ACxOBYiXcfP1ze-ZLmG9uxNOOl2mgBpbWv3CEH8fz1sIlc4Zq-YmXTNlV7fwpEVeP0WawXi9l-AL06Nz9Jw9Md8uu&lib=ML1OtzSUDqqBv5Rhp8Ibevq8tNrNXU7ET");
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
      `;
  
      container.appendChild(pianoElement);
    });
  }
  
  // Appeler la fonction pour afficher les pianos au chargement de la page
  afficherPianos();
  