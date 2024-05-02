async function fetchData() {
    // Récupérer les données JSON
    console.log("v3");
    const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=h73LG2STHokgsLY5v737iaL0soLPcktBwoXMYpimpYmGJ5J_mNfO-V2c2x8emAotBqs3SXuTbzmW7ppcBZ0o-uq-L250hG9hm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDw4Aowd6dEcBKwet8QX93jDfxvjxsroDzrRUkFUa29krRR_fcV6d3usC_DavSbpATDl147DuKf-9Ww8gQXIz1uN0E_1dFcejNz9Jw9Md8uu&lib=Ml1e-lb1qAMfOSe-7BliAWq8tNrNXU7ET");
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
        <h4>${piano.numero}</h4>
        <h3>piano ${piano.marque}</h3>
        <p>Couleur: ${piano.couleur}</p>
        <p>Piano à vendre: ${piano.prix}</p>
        <p>Prix de location: ${piano.prixloc}</p>

        <div style="text-align: center;">
          <img src="${piano.photo_site}" alt="Photo du piano à louer" style="max-width: 100%; max-height: 300px;">
        </div>
        <p><a href="${piano.photos}">voir plus de photos</a></p>

      `;
  
      container.appendChild(pianoElement);
    });
  }
  
  // Appeler la fonction pour afficher les pianos au chargement de la page
  afficherPianos();
