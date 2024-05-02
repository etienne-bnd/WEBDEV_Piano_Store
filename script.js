async function fetchData() {
    // Récupérer les données JSON
    console.log("v3");
    const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=w5ASxkUfjgjOcm0w6dLJJZkONjDIlpSZhW1PxWBKhBct_qIkmXTcL2tTZ-uk0oJ3XpAHQMr5GCC5EMI_CgKW-8C3tJY1Y6eWm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIc-e-cSbcZET-UBv6SiWoXy4aU7StCWJngkkZyfGGeBPye3SZwiXHDzHnA-3GMJ-_v6tYKOXfb5tw70HZzkmcsv1HTz7-lN99z9Jw9Md8uu&lib=Ml1e-lb1qAMfOSe-7BliAWq8tNrNXU7ET");
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
